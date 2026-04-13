import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Student, LoadingState } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private dataUrl = 'assets/data/student.json';

  constructor(private http: HttpClient) {}

  getStudent(): Observable<Student> {
    return this.http.get<Student>(this.dataUrl).pipe(
      delay(800), 
      catchError((error) => {
        return throwError(() => new Error('Failed to load student profile. Please try again.'));
      })
    );
  }

  getInitialLoadingState(): LoadingState {
    return {
      isLoading: true,
      hasError: false,
      errorMessage: '',
    };
  }
}