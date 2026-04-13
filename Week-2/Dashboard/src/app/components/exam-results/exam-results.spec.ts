import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamResults } from './exam-results';

describe('ExamResults', () => {
  let component: ExamResults;
  let fixture: ComponentFixture<ExamResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamResults],
    }).compileComponents();

    fixture = TestBed.createComponent(ExamResults);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
