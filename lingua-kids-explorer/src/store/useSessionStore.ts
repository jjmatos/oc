import { create } from 'zustand';
import { Lesson } from '../types';

interface SessionState {
  currentQuestion: number;
  score: number;
  currentGeneratedLesson: Lesson | null;
  nextQuestion: () => void;
  incrementScore: () => void;
  setGeneratedLesson: (lesson: Lesson | null) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  currentQuestion: 0,
  score: 0,
  currentGeneratedLesson: null,
  nextQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  setGeneratedLesson: (lesson) => set({ currentGeneratedLesson: lesson }),
}));
