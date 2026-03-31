import { TestBed } from '@angular/core/testing';
import { StorageService } from './storage';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return empty history initially', () => {
    expect(service.getHistory()).toEqual([]);
  });

  it('should add city to history', () => {
    service.addToHistory('London');
    const history = service.getHistory();
    expect(history.length).toBe(1);
    expect(history[0].city).toBe('London');
  });

  it('should not duplicate city in history', () => {
    service.addToHistory('London');
    service.addToHistory('London');
    expect(service.getHistory().length).toBe(1);
  });

  it('should add latest city at top of history', () => {
    service.addToHistory('London');
    service.addToHistory('Mumbai');
    expect(service.getHistory()[0].city).toBe('Mumbai');
  });

  it('should remove city from history', () => {
    service.addToHistory('London');
    service.removeFromHistory('London');
    expect(service.getHistory().length).toBe(0);
  });

  it('should clear all history', () => {
    service.addToHistory('London');
    service.addToHistory('Mumbai');
    service.clearHistory();
    expect(service.getHistory()).toEqual([]);
  });

  it('should add city to favorites', () => {
    service.addToFavorites('London', 'UK');
    expect(service.getFavorites().length).toBe(1);
    expect(service.getFavorites()[0].name).toBe('London');
  });

  it('should not duplicate city in favorites', () => {
    service.addToFavorites('London', 'UK');
    service.addToFavorites('London', 'UK');
    expect(service.getFavorites().length).toBe(1);
  });

  it('should return true for isFavorite when city is saved', () => {
    service.addToFavorites('London', 'UK');
    expect(service.isFavorite('London')).toBe(true);
  });

  it('should return false for isFavorite when city is not saved', () => {
    expect(service.isFavorite('London')).toBe(false);
  });

  it('should remove city from favorites', () => {
    service.addToFavorites('London', 'UK');
    service.removeFromFavorites('London');
    expect(service.getFavorites().length).toBe(0);
  });

  it('should clear all favorites', () => {
    service.addToFavorites('London', 'UK');
    service.addToFavorites('Mumbai', 'India');
    service.clearFavorites();
    expect(service.getFavorites()).toEqual([]);
  });

  it('should be case insensitive for isFavorite', () => {
    service.addToFavorites('London', 'UK');
    expect(service.isFavorite('london')).toBe(true);
    expect(service.isFavorite('LONDON')).toBe(true);
  });
});