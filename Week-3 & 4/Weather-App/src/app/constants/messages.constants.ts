export const MESSAGES = {
  errors: {
    cityNotFound: 'City not found. Please check the name and try again.',
    networkError: 'Network error. Please check your connection and try again.',
    fetchWeather: 'Failed to fetch weather data. Please try again.',
    fetchForecast: 'Failed to fetch forecast data. Please try again.',
    generic: 'Something went wrong. Please try again.',
  },

  success: {
    addedToFavorites: 'City added to favorites.',
    removedFromFavorites: 'City removed from favorites.',
  },

  validation: {
    emptyCityName: 'Please enter a city name.',
    invalidCityName: 'City name must be at least 2 characters.',
  },

  empty: {
    history: 'You have not searched for any city yet.',
    favorites: 'You have not saved any favorite cities yet.',
    hourly: 'Hourly forecast data is not available.',
    forecast: '5-day forecast data is not available.',
  },
};