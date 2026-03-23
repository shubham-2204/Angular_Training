import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';
import { SearchItem, LoadingState, SearchCategory } from '../../models/dashboard.models';

@Component({
  selector: 'app-live-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './live-search.html',
  styleUrl: './live-search.css',
})
export class LiveSearchComponent implements OnInit, OnDestroy {
  searchQuery = '';
  results: SearchItem[] = [];
  state: LoadingState = { isLoading: false, hasError: false, errorMessage: '' };
  activeCategory: SearchCategory = SearchCategory.All;
  hasSearched = false;
  searchCategory = SearchCategory;

  private destroy$ = new Subject<void>();

  readonly categories: SearchCategory[] = [
    SearchCategory.All,
    SearchCategory.Course,
    SearchCategory.Faculty,
    SearchCategory.Event,
    SearchCategory.Resource,
  ];

  constructor(public searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.searchResults$
      .pipe(takeUntil(this.destroy$))
      .subscribe((results) => {
        this.results = results;
        if (this.searchQuery.trim()) this.hasSearched = true;
      });

    this.searchService.loadingState$
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => (this.state = state));
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.hasSearched = false;
      this.searchService.clearSearch();
      return;
    }
    this.searchService.search(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.hasSearched = false;
    this.activeCategory = SearchCategory.All;
    this.searchService.clearSearch();
  }

  get filteredResults(): SearchItem[] {
    if (this.activeCategory === SearchCategory.All) return this.results;
    return this.results.filter((r) => r.category === this.activeCategory);
  }

  private categoryClassMap: Record<string, string> = {
    [SearchCategory.Course]: 'category-course',
    [SearchCategory.Faculty]: 'category-faculty',
    [SearchCategory.Event]: 'category-event',
    [SearchCategory.Resource]: 'category-resource',
  };

  getCategoryClass(category: string): string {
    return this.categoryClassMap[category] ?? 'category-default';
  }

  getCountByCategory(category: SearchCategory): number {
    if (category === SearchCategory.All) return this.results.length;
    return this.results.filter((r) => r.category === category).length;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}