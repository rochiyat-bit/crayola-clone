export interface Activity {
  id: string;
  categoryId?: string;
  title: string;
  slug: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  ageRange: string;
  duration: number;
  materialsNeeded: string[];
  coverImageUrl: string;
  videoUrl?: string;
  isPremium: boolean;
  viewCount: number;
  likeCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityStep {
  id: string;
  activityId: string;
  stepNumber: number;
  title: string;
  description: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface ActivityWithSteps extends Activity {
  steps: ActivityStep[];
}
