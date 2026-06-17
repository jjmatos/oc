import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useChatStore } from '../../store/useChatStore';
import { useSessionStore } from '../../store/useSessionStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { Lesson, LessonType } from "../../types";
import Button from '../ui/Button';

export default function Chatbot() {
  const { messages, isOpen, toggleChat, addMessage } = useChatStore();
  const { setGeneratedLesson } = useSessionStore();
  const { language, apiKey, model } = useSettingsStore();
  const [input, setInput] = useState('');
  
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = input;
    addMessage({ role: 'user', content: userMessage });
    setInput('');
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `System: You are an expert English teacher. User wants: ${userMessage}. Respond in ${language}. If user asks to generate a lesson, structure it as a JSON object.` }] }]
        })
      });
      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No response from AI";
      addMessage({ role: 'assistant', content: aiResponse });
      
      if (userMessage.toLowerCase().includes('generate lesson')) {
        const newLesson: Lesson = {
          id: Date.now().toString(),
          title: `Custom Lesson (${language.toUpperCase()}): ` + userMessage,
          topic: 'vocabulary' as LessonType,
          difficulty: 'beginner',
          content: { text: aiResponse },
          languageTarget: language as 'es' | 'pl'
        };
        setGeneratedLesson(newLesson);
      }
    } catch (error) {
      addMessage({ role: 'assistant', content: 'Error: Could not connect to API. Check your API key.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-gray-900 border border-gray-700 rounded-lg shadow-xl flex flex-col resize overflow-auto">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
        <h2 className="font-bold">LinguaBot</h2>
        <Button size="sm" onClick={toggleChat}>X</Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === 'user' ? 'bg-purple-900/50 self-end' : 'bg-gray-700'}`}>
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code({className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <SyntaxHighlighter
                      {...props}
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {msg.content}
            </ReactMarkdown>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-700 flex gap-2">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-gray-800 rounded p-2 text-white"
          placeholder="Ask something..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
