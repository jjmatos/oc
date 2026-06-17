import { Outlet, Link } from 'react-router-dom';
import Chatbot from './chat/Chatbot';
import { useChatStore } from '../store/useChatStore';
import { useSettingsStore } from '../store/useSettingsStore';

export default function AppLayout() {
  const { toggleChat } = useChatStore();
  const { theme } = useSettingsStore();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <nav className={`p-4 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} flex justify-between items-center`}>
        <Link to="/" className="text-xl font-bold text-purple-400">LinguaKids</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-purple-300">Dashboard</Link>
          <Link to="/settings" className="hover:text-purple-300">Settings</Link>
          <button onClick={toggleChat} className="bg-purple-600 px-3 py-1 rounded">Chat</button>
        </div>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
      <Chatbot />
    </div>
  );
}
