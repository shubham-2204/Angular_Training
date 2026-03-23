export enum CourseStatus {
  All = 'all',
  Ongoing = 'ongoing',
  Completed = 'completed',
  Upcoming = 'upcoming',
}

export enum NotificationType {
  Info = 'info',
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
}

export enum SearchCategory {
  All = 'all',
  Course = 'course',
  Faculty = 'faculty',
  Event = 'event',
  Resource = 'resource',
}

export enum ExamStatus {
  Pass = 'pass',
  Fail = 'fail',
}

export enum TabId {
  Profile = 'profile',
  Courses = 'courses',
  Notifications = 'notifications',
  Search = 'search',
  Results = 'results',
}
export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  rollNumber: string;
  department: string;
  semester: number;
  avatarUrl: string;
  cgpa: number;
  enrollmentYear: number;
}

export interface Course {
  id: number;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  progress: number;        
  status: string;
  schedule: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  timestamp: string;
}

export interface SearchItem {
  id: number;
  title: string;
  category: SearchCategory;
  description: string;
  url?: string;
}

export interface ExamResult {
  id: number;
  subject: string;
  subjectCode: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  status: ExamStatus;
  semester: number;
  examDate: string;
}

export interface LoadingState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export interface Tab {
  id: TabId;
  label: string;
  icon: string;
}