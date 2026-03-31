export enum WeatherCondition {
  Sunny = 'sunny',
  Clear = 'clear',
  PartlyCloudy = 'partly-cloudy',
  Cloudy = 'cloudy',
  Overcast = 'overcast',
  Rainy = 'rainy',
  Stormy = 'stormy',
  Snowy = 'snowy',
  Foggy = 'foggy',
  Night = 'night',
  Default = 'default',
}

export enum TempUnit {
  Celsius = 'celsius',
  Fahrenheit = 'fahrenheit',
}

export enum AppRoute {
  Home = '',
  Weather = 'weather',
  Forecast = 'forecast',
  History = 'history',
  Favorites = 'favorites',
}

export interface WeatherConditionInfo {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  humidity: number;
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  vis_km: number;
  uv: number;
  is_day: number;
  condition: WeatherConditionInfo;
}

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface WeatherResponse {
  location: WeatherLocation;
  current: CurrentWeather;
}

export interface HourlyWeather {
  time: string;
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  humidity: number;
  wind_kph: number;
  chance_of_rain: number;
  condition: WeatherConditionInfo;
  is_day: number;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    daily_chance_of_rain: number;
    condition: WeatherConditionInfo;
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
  hour: HourlyWeather[];
}

export interface ForecastResponse {
  location: WeatherLocation;
  current: CurrentWeather;
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface FavoriteCity {
  name: string;
  country: string;
  addedAt: string;
}

export interface SearchHistoryItem {
  city: string;
  searchedAt: string;
}

export interface WeatherState {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}