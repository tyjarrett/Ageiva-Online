from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from healthModel import serializers, models
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from healthModel import constants

# Create your views here.
class HealthDataView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    serializer = serializers.PostHealthDataSerializer(data=request.data)
    if not serializer.is_valid():
      print(serializer.errors)
      return Response(status=status.HTTP_400_BAD_REQUEST)
    try:
      background = models.BackgroundData.objects.get(user=request.user)
    except models.BackgroundData.DoesNotExist:
      if "age" not in serializer.validated_data:
        return Response({"error": "age must be included in first post"}, status=status.HTTP_400_BAD_REQUEST)
      background = models.BackgroundData.objects.create(user=request.user, age=serializer.validated_data["age"])

    today = datetime.now().date()
    new_age = today.year-background.date.year+background.age

    # This will overwrite any previous entries for this month
    try: 
      health_data = models.HealthData.objects.get(date__year=today.year, date__month=today.month)
    except models.HealthData.DoesNotExist:
      health_data = models.HealthData.objects.create(user=request.user, age=new_age, background=background)

    for variable, content in serializer.validated_data.items():
      if variable not in constants.background_variables and variable not in constants.health_variables:
        continue
      var_serializer = serializers.VariableContentSerializer(data=content)
      if not var_serializer.is_valid():
        return Response(status=status.HTTP_400_BAD_REQUEST)
      if var_serializer.validated_data["type"] == "qualitative":
        # need to convert into quantitative
        return Response(status=status.HTTP_501_NOT_IMPLEMENTED)
      if variable in constants.background_variables:
        setattr(background, variable, var_serializer.validated_data["response"])
      if variable in constants.health_variables:
        setattr(health_data, variable, var_serializer.validated_data["response"])
    background.save()
    health_data.save()

    return Response(status=status.HTTP_201_CREATED)
    