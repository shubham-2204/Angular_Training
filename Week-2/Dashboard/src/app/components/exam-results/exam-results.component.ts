import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExamService } from '../../services/exam.service';
import { ExamResult, LoadingState, ExamStatus } from '../../models/dashboard.models';

@Component({
  selector: 'app-exam-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-results.html',
  styleUrl: './exam-results.css',
})
export class ExamResultsComponent implements OnInit, OnDestroy {
  results: ExamResult[] = [];
  filteredResults: ExamResult[] = [];
  availableSemesters: number[] = [];
  selectedSemester: number = 0;
  state: LoadingState = { isLoading: true, hasError: false, errorMessage: '' };
  examStatus = ExamStatus;

  private destroy$ = new Subject<void>();

  constructor(public examService: ExamService) { }

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    this.state = { isLoading: true, hasError: false, errorMessage: '' };

    this.examService.getExamResults()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.results = data;
          this.availableSemesters = [
            ...new Set(data.map((r) => r.semester)),
          ].sort((a, b) => b - a);
          this.selectedSemester = this.availableSemesters[0];
          this.applyFilter();
          this.state = { isLoading: false, hasError: false, errorMessage: '' };
        },
        error: (err) => {
          this.state = {
            isLoading: false,
            hasError: true,
            errorMessage: err.message,
          };
        },
      });
  }

  applyFilter(): void {
    this.filteredResults = this.results.filter(
      (r) => r.semester === this.selectedSemester
    );
  }

  selectSemester(sem: number): void {
    this.selectedSemester = sem;
    this.applyFilter();
  }

  get totalMarksObtained(): number {
    return this.filteredResults.reduce((sum, r) => sum + r.marksObtained, 0);
  }

  get totalMarks(): number {
    return this.filteredResults.reduce((sum, r) => sum + r.totalMarks, 0);
  }

  get overallPercentage(): number {
    if (!this.totalMarks) return 0;
    return Math.round((this.totalMarksObtained / this.totalMarks) * 100);
  }

  get passCount(): number {
    return this.filteredResults.filter((r) => r.status === ExamStatus.Pass).length;
  }

  get failCount(): number {
    return this.filteredResults.filter((r) => r.status === ExamStatus.Fail).length;
  }

  getPercentage(obtained: number, total: number): number {
    return this.examService.calculatePercentage(obtained, total);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
