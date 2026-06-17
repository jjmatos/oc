import { create } from 'zustand';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
  toggleChat: () => void;
  addMessage: (message: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [{ role: 'system', content: 'You are an AI assistant for LinguaKids. You can help create interactive English lessons.' }],
  isOpen: false,
  systemPrompt: 'You are an expert English teacher. Create engaging, structured, and fun lessons.',
  setSystemPrompt: (prompt) => set({ systemPrompt: prompt }),
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
