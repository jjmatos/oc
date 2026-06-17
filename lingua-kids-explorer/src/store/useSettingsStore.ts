import { create } from 'zustand';

type Language = 'es' | 'pl';
type Theme = 'dark' | 'light';

interface SettingsState {
  language: Language;
  theme: Theme;
  apiKey: string;
  model: string;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  setApiKey: (apiKey: string) => void;
  setModel: (model: string) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'es',
  theme: 'dark',
  apiKey: '',
  model: 'gemini-1.5-flash',
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => set({ theme }),
  setApiKey: (apiKey) => set({ apiKey }),
  setModel: (model) => set({ model }),
}));
