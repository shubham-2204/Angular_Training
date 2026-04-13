import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { ExamResult, LoadingState } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private dataUrl = 'assets/data/exam-results.json';

  constructor(private http: HttpClient) {}

  getExamResults(): Observable<ExamResult[]> {
    return this.http.get<ExamResult[]>(this.dataUrl).pipe(
      delay(1000),
      catchError((error) => {
        return throwError(
          () => new Error('Failed to load exam results. Please try again.')
        );
      })
    );
  }

  getResultsBySemester(semester: number): Observable<ExamResult[]> {
    return this.getExamResults().pipe(
      map((results) => results.filter((r) => r.semester === semester))
    );
  }

  getAvailableSemesters(): Observable<number[]> {
    return this.getExamResults().pipe(
      map((results) => {
        const semesters = [...new Set(results.map((r) => r.semester))];
        return semesters.sort((a, b) => b - a); 
      })
    );
  }

  calculatePercentage(obtained: number, total: number): number {
    return Math.round((obtained / total) * 100);
  }

  getGradeClass(grade: string): string {
  const gradeClassMap: Record<string, string> = {
    'A+': 'grade-a-plus',
    'A': 'grade-a',
    'B+': 'grade-b-plus',
    'B': 'grade-b',
    'C': 'grade-c',
    'F': 'grade-f',
  };
  return gradeClassMap[grade] ?? 'grade-default';
}

  getInitialLoadingState(): LoadingState {
    return {
      isLoading: true,
      hasError: false,
      errorMessage: '',
    };
  }
}