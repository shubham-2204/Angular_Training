import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoursesService } from '../../services/courses.service';
import { Course, LoadingState, CourseStatus } from '../../models/dashboard.models';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-list.html',
  styleUrl: './courses-list.css',
})
export class CoursesListComponent implements OnInit, OnDestroy {
  courses: Course[] = [];
  activeFilter: CourseStatus = CourseStatus.All;
  state: LoadingState = { isLoading: false, hasError: false, errorMessage: '' };
  courseStatus = CourseStatus;

  private destroy$ = new Subject<void>();

  constructor(public coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.loadingState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => (this.state = state));

    this.coursesService.courses$
      .pipe(takeUntil(this.destroy$))
      .subscribe((courses) => (this.courses = courses));

    this.coursesService.loadCourses();
  }

  get filteredCourses(): Course[] {
  if (this.activeFilter === CourseStatus.All) return this.courses;
  return this.courses.filter((c) => c.status === this.activeFilter);
}

  setFilter(filter: CourseStatus): void {
    this.activeFilter = filter;
  }

  getProgressClass(progress: number): string {
    if (progress === 100) return 'progress-complete';
    if (progress >= 60) return 'progress-high';
    if (progress >= 30) return 'progress-medium';
    return 'progress-low';
  }

  private statusClassMap: Record<string, string> = {
    [CourseStatus.Ongoing]: 'status-ongoing',
    [CourseStatus.Completed]: 'status-completed',
    [CourseStatus.Upcoming]: 'status-upcoming',
  };

  getStatusClass(status: string): string {
    return this.statusClassMap[status] ?? 'status-default';
  }

  getCountByStatus(status: string): number {
    return this.courses.filter((c) => c.status === status).length;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}