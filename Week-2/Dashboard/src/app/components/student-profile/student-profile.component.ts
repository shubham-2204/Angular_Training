import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StudentService } from '../../services/student.service';
import { Student, LoadingState } from '../../models/dashboard.models';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfileComponent implements OnInit, OnDestroy {
  student: Student | null = null;
  state: LoadingState = { isLoading: true, hasError: false, errorMessage: '' };

  private destroy$ = new Subject<void>();

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.state = { isLoading: true, hasError: false, errorMessage: '' };

    this.studentService.getStudent()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.student = data;
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

  getAvatarAlt(): string {
    return this.student ? `${this.student.name}'s profile picture` : 'Profile picture';
  }

  getCgpaClass(): string {
    if (!this.student) return 'cgpa-default';
    if (this.student.cgpa >= 9) return 'cgpa-excellent';
    if (this.student.cgpa >= 7.5) return 'cgpa-good';
    if (this.student.cgpa >= 6) return 'cgpa-average';
    return 'cgpa-poor';
  }

  get cgpaWidthPercent(): number {
    return this.student ? (this.student.cgpa / 10) * 100 : 0;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
