from django.db import models

class Holiday(models.Model):
    dat_fetched = models.DateTimeField(auto_now_add=True)
    country_name = models.CharField(max_length=255)
    country_code = models.CharField(max_length=10)
    holiday_name = models.CharField(max_length=255)
    holiday_date = models.DateField()
    json_data = models.JSONField()  # Field to store the entire JSON data

    def __str__(self):
        return f"{self.holiday_name} in {self.country_name} on {self.holiday_date}"
