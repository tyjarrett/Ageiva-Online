from healthModel import views
from django.urls import path

urlpatterns = [
    path("", views.HealthDataView.as_view()),
    path("save/", views.SaveHealthDataView.as_view()),
    path("predict/", views.PredictHealthDataView.as_view()),
]
