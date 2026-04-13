import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseService],
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable from saveWeatherData', () => {
    const mockWeather: any = {
      location: { name: 'London', country: 'UK' },
      current: {
        temp_c: 15,
        condition: { text: 'Sunny' },
        humidity: 60,
        wind_kph: 10,
      },
    };

    const result = service.saveWeatherData('London', mockWeather);
    expect(result).toBeTruthy();
    expect(typeof result.subscribe).toBe('function');
  });

  it('should return an Observable from incrementSearchCounter', () => {
    const result = service.incrementSearchCounter('London');
    expect(result).toBeTruthy();
    expect(typeof result.subscribe).toBe('function');
  });

  it('should return an Observable from getSearchCounter', () => {
    const result = service.getSearchCounter('London');
    expect(result).toBeTruthy();
    expect(typeof result.subscribe).toBe('function');
  });

  it('should return an Observable from getTotalSearchCount', () => {
    const result = service.getTotalSearchCount();
    expect(result).toBeTruthy();
    expect(typeof result.subscribe).toBe('function');
  });
});