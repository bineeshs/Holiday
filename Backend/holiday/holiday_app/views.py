
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.cache import cache
from .tests import fetch_holidays_from_api  
from rest_framework import status
from holiday_app.models import Holiday

class GetHolidays(APIView):

    def get(self, request):
        try: 
            country = request.GET.get('country')
            year = request.GET.get('year')
            type = request.GET.get('type')
            month = request.GET.get('month')
            from_date = request.GET.get('start_date')
            to_date = request.GET.get('end_date')

            
            if not country or not year:
                return Response({"error": "country and year are required"}, status=status.HTTP_400_BAD_REQUEST)

            
            cache_key = f"holidays_{country}_{year}"
            holidays = cache.get(cache_key)
            
            if not holidays:
                data = fetch_holidays_from_api(country, year)                           
                if data and 'response' in data:
                    if data['response'] and 'holidays' in data['response']:
                       holidays = data['response']['holidays']
                   
                       cache.set(cache_key, holidays, timeout=86400)
                    else:
                        holidays = []
                else:
                    return Response({"error": "No data from API"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            else:
                print("Returning cached holidays")  
           
            if holidays:
                filtered_holidays = [] 
                dct_temp_data = {}               
                for holiday in holidays:
                    if country in holiday['country']['id'].upper(): 
                        add_to_filtered =  False                           
                        
                        if month or  type or from_date or  to_date: 
                            
                            dct_temp_data = {}
                            add_to_filtered =  True                                                        
                            if month and holiday['date']['datetime']['month'] == int(month):
                                dct_temp_data = holiday
                                if type and  (type in dct_temp_data['type']):                                    
                                    dct_temp_data = dct_temp_data
                                    if from_date and to_date:
                                        if (from_date <= dct_temp_data['date']['iso'] <= to_date):
                                           print(dct_temp_data['date']['iso'],dct_temp_data)
                                           dct_temp_data = dct_temp_data
                                        else:
                                            dct_temp_data = {}
                                elif (not type):
                                    if from_date and to_date:
                                        if (from_date <= dct_temp_data['date']['iso'] <= to_date):
                                           dct_temp_data = dct_temp_data
                                else:
                                    dct_temp_data = {}
                            
                            
                            
                            if type and (type in holiday['type']) and not month:
                                print("type")
                                dct_temp_data = holiday
                                if from_date and to_date:
                                        if (from_date <= dct_temp_data['date']['iso'] <= to_date):
                                           dct_temp_data = dct_temp_data
                                        else:
                                            dct_temp_data = {}


                            if from_date and to_date and not type and not month:
                               print("date")
                               if (from_date <= holiday['date']['iso'] <= to_date):
                                   dct_temp_data = holiday 
                       
                        if add_to_filtered:                            
                            if dct_temp_data:                               
                               filtered_holidays.append(dct_temp_data)                            
                        else:
                            filtered_holidays.append(holiday)                

                if not filtered_holidays:
                    return Response({"message": "No data Found", "status_code": 400}, status=status.HTTP_404_NOT_FOUND, )

              
            else:
                return Response({"message": "No data from API", "status_code": 400}, status=status.HTTP_404_NOT_FOUND)            
            
            return Response({"holidays": filtered_holidays,"status_code": 200}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
