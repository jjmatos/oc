import { useSettingsStore } from '../store/useSettingsStore';
import Card from '../components/ui/Card';

export default function Settings() {
  const { language, theme, apiKey, model, setLanguage, setTheme, setApiKey, setModel } = useSettingsStore();

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <Card className="space-y-4">
        <div>
          <label className="block mb-2">Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value as any)} className="bg-gray-700 p-2 rounded w-full">
            <option value="es">Spanish</option>
            <option value="pl">Polish</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Theme</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value as any)} className="bg-gray-700 p-2 rounded w-full">
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">API Key (Gemini)</label>
          <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="bg-gray-700 p-2 rounded w-full" placeholder="Your API Key" />
        </div>

        <div>
          <label className="block mb-2">Model</label>
          <select value={model} onChange={(e) => setModel(e.target.value)} className="bg-gray-700 p-2 rounded w-full">
            <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
          </select>
        </div>
      </Card>
    </div>
  );
}
