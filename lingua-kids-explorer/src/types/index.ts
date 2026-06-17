export type LessonType = 'vocabulary' | 'grammar' | 'reading';

export interface Lesson {
  id: string;
  title: string;
  topic: LessonType;
  difficulty: 'beginner' | 'intermediate';
  content: {
    text: any;
  };
  languageTarget: 'es' | 'pl';
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  points: number;
  streak: number;
}
