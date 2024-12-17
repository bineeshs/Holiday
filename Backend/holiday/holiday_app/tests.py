import requests
from django.conf import settings

def fetch_holidays_from_api(country, year):
    """
    Fetch holidays for a specific country and year from Calendarific API.
    """
    
    url = "https://calendarific.com/api/v2/holidays"
    params = {
        "api_key": settings.CALENDARIFIC_API_KEY,
        "country": country,
        "year": year,
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching holidays: {e}")
        return None
