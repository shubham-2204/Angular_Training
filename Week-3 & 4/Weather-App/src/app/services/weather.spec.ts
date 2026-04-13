import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { WeatherService } from './weather';
import { environment } from '../../environments/environment';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial state with isLoading false', () => {
    const state = service.getInitialState();
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false); 
    expect(state.errorMessage).toBe('');
  });

  it('should return loading state with isLoading true', () => {
    const state = service.getLoadingState();
    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe(false);
  });

  it('should return error state with correct message', () => {
    const state = service.getErrorState('City not found');
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
    expect(state.errorMessage).toBe('City not found');
  });

  it('should call correct URL for getCurrentWeather', () => {
    const mockResponse = {
      location: { name: 'London', region: 'City of London', country: 'UK', lat: 51, lon: -0.1, localtime: '2026-03-24' },
      current: {
        temp_c: 15, temp_f: 59, feelslike_c: 13, feelslike_f: 55,
        humidity: 70, wind_kph: 20, wind_dir: 'NW', pressure_mb: 1012,
        vis_km: 10, uv: 3, is_day: 1,
        condition: { text: 'Partly cloudy', icon: '//cdn.icon.png', code: 1003 },
      },
    };

    service.getCurrentWeather('London').subscribe((data) => {
      expect(data.location.name).toBe('London');
      expect(data.current.temp_c).toBe(15);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/current.json') && request.params.get('q') === 'London'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('key')).toBe(environment.weatherApiKey);
    req.flush(mockResponse);
  });

  it('should handle error in getCurrentWeather', () => {
    service.getCurrentWeather('InvalidCity123').subscribe({
      error: (err) => {
        expect(err.message).toBeTruthy();
      },
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/current.json')
    );
    req.flush({ error: { message: 'No matching location found.' } }, { status: 400, statusText: 'Bad Request' });
  });

  it('should call correct URL for getForecast', () => {
    service.getForecast('Mumbai', 5).subscribe();

    const req = httpMock.expectOne((request) =>
      request.url.includes('/forecast.json') && request.params.get('q') === 'Mumbai'
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('days')).toBe('5');
    req.flush({ location: {}, current: {}, forecast: { forecastday: [] } });
  });
});