export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}

export enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed'
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  dueDate: Date;
}


