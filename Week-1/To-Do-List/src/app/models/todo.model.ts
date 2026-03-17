export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate: Date;
}

export type FilterType = 'all' | 'active' | 'completed';
