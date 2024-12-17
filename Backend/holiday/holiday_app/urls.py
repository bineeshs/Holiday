from django.urls import path
from .views import GetHolidays

urlpatterns = [
    path('api/holidays/', GetHolidays.as_view(), name='get_holidays'),  
]
