from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from healthModel import serializers, models
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from healthModel import constants
from django.shortcuts import get_object_or_404

# Create your views here.
class HealthDataView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    serializer = serializers.PostHealthDataSerializer(data=request.data)
    if not serializer.is_valid():
      return Response(status=status.HTTP_400_BAD_REQUEST)
    try:
      background = models.BackgroundData.objects.get(user=request.user)
    except models.BackgroundData.DoesNotExist:
      if "age" not in serializer.validated_data:
        return Response({"error": "age must be included in first post"}, status=status.HTTP_400_BAD_REQUEST)
      background = models.BackgroundData.objects.create(user=request.user, age=serializer.validated_data["age"])

    today = datetime.now().date()
    new_age = today.year-background.date.year+background.age
    current_quarter_months = constants.quarter_months[today.month]

    # This will overwrite any previous entries for this month
    try: 
      health_data = models.HealthData.objects.get(date__year=today.year, date__month__in=current_quarter_months)
    except models.HealthData.DoesNotExist:\
      health_data = models.HealthData.objects.create(user=request.user, age=new_age, background=background)

    for variable, content in serializer.validated_data.items():
      if variable not in constants.background_variables and variable not in constants.health_variables:
        continue
      var_serializer = serializers.VariableContentSerializer(data=content)
      if not var_serializer.is_valid():
        return Response(status=status.HTTP_400_BAD_REQUEST)
      
      qualitative = var_serializer.validated_data["type"] == "qualitative"
      data = var_serializer.validated_data["response"]
      if qualitative and variable in constants.qual_to_quant.keys():
        if data not in range(0,5):
          return Response(status=status.HTTP_400_BAD_REQUEST)
        value_to_set = constants.qual_to_quant[variable][data]
      else:
        value_to_set = data

      if variable in constants.background_variables:
        setattr(background, variable, value_to_set)
      if variable in constants.health_variables:
        setattr(health_data, variable, value_to_set)
    background.save()
    health_data.save()

    return Response(status=status.HTTP_201_CREATED)
  
  def get(self, request):
    query = request.GET.get("vars", "")
    vars = query.split(",") if query else []
    vars = list(filter(lambda var: var in constants.background_variables + constants.health_variables, vars))
    background = get_object_or_404(models.BackgroundData, user=request.user)
    health_data = models.HealthData.objects.filter(user=request.user).order_by("date")

    if len(vars) == 0:
      ser_background = serializers.BackgroundDataSerializer(background)
      ser_health_data = serializers.HealthDataSerializer(health_data, many=True)
      response = {"background": ser_background.data, "health_data": ser_health_data.data}
    else:
      fields_to_include = ["id", "date", "age"]
      res_background = {var: getattr(background, var) for var in fields_to_include + vars if var in fields_to_include + constants.background_variables}
      res_health_data = []
      for d in health_data:
        res_health_data.append({var: getattr(d, var) for var in fields_to_include + vars if var in fields_to_include + constants.health_variables})

      response = { "background": res_background, "health_data": res_health_data }
    return Response(response)
    
class SaveHealthDataView(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    serializer = serializers.PostSaveHealthDataSerializer(data=request.data)
    if not serializer.is_valid():
      return Response(status=status.HTTP_400_BAD_REQUEST)
    # serializer not working for some reason
    print(serializer.validated_data)
    save_data, created = models.SaveData.objects.get_or_create(user=request.user)
    variables = models.SavedResponse.objects.filter(save_model=save_data)
    to_save = serializer.validated_data["to_save"]

    for variable in variables:
      if variable.variable_id not in to_save:
        variable.delete()
    for var_to_save, var_content in to_save.items():
      saved_response, created = models.SavedResponse.objects.get_or_create(save_model=save_data, 
                                                                  variable_id=var_to_save, 
                                                                  defaults={ "response": -1, "type": "quantiative" })
      saved_response.response = var_content["response"]
      saved_response.type = var_content["type"]
      saved_response.save()
    save_data.last_question = serializer.validated_data["last_question_number"]
    save_data.save()
    return Response(status=status.HTTP_201_CREATED)
    
  def get(self, request):
    save_data = get_object_or_404(models.SaveData, user=request.user)
    saved_responses = models.SavedResponse.objects.filter(save_model=save_data)
    serialized_responses = serializers.SavedResponseSerializer(saved_responses, many=True)
    response = {"user": save_data.user.pk, "last_question": save_data.last_question, "saved_data": serialized_responses.data}
    return Response(response)