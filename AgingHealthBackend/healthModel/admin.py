from django.contrib import admin

from healthModel import models

admin.site.register(models.BackgroundData)
admin.site.register(models.HealthData)