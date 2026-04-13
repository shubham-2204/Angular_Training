import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Course, LoadingState, CourseStatus } from '../models/dashboard.models';
import { ERROR_MESSAGES } from '../constants/messages.constants'; // 👈 add this

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private dataUrl = 'assets/data/courses.json';

  private coursesSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.coursesSubject.asObservable();

  private loadingState = new BehaviorSubject<LoadingState>({
    isLoading: false,
    hasError: false,
    errorMessage: '',
  });
  loadingState$ = this.loadingState.asObservable();

  constructor(private http: HttpClient) {}

  loadCourses(): void {
    this.loadingState.next({ isLoading: true, hasError: false, errorMessage: '' });

    this.http.get<Course[]>(this.dataUrl).pipe(
      delay(900),
      tap((courses) => {
        this.coursesSubject.next(courses);
        this.loadingState.next({ isLoading: false, hasError: false, errorMessage: '' });
      }),
      catchError((error) => {
        this.loadingState.next({
          isLoading: false,
          hasError: true,
          errorMessage: ERROR_MESSAGES.LOAD_COURSES_FAILED, // 👈 use constant here
        });
        return throwError(() => new Error(ERROR_MESSAGES.LOAD_COURSES_FAILED));
      })
    ).subscribe();
  }

  getCoursesByStatus(status: CourseStatus): Observable<Course[]> {
    return new Observable((observer) => {
      this.courses$.subscribe((courses) => {
        observer.next(courses.filter((c) => c.status === status));
      });
    });
  }
}