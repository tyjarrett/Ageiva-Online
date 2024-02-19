from rest_framework import serializers
from healthModel import models

class BackgroundDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.BackgroundData
    fields = "__all__"

class HealthDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.HealthData
    fields = "__all__"

class VariableContentSerializer(serializers.Serializer):
  response = serializers.FloatField()
  type = serializers.CharField(max_length=12)

class PostHealthDataSerializer(serializers.Serializer):
  # background
  age = serializers.IntegerField(required=False)
  BP_med = VariableContentSerializer(required=False)
  anticoagulant_med = VariableContentSerializer(required=False)
  chol_med = VariableContentSerializer(required=False)
  hipknee_treat = VariableContentSerializer(required=False)
  lungasthma_med = VariableContentSerializer(required=False)
  longill = VariableContentSerializer(required=False)
  limitact = VariableContentSerializer(required=False)
  effort = VariableContentSerializer(required=False)
  smkevr = VariableContentSerializer(required=False)
  smknow = VariableContentSerializer(required=False)
  mobility = VariableContentSerializer(required=False)
  country = VariableContentSerializer(required=False)
  alcohol = VariableContentSerializer(required=False)
  jointrep = VariableContentSerializer(required=False)
  fractures = VariableContentSerializer(required=False)
  height = VariableContentSerializer(required=False)
  bmi = VariableContentSerializer(required=False)
  ethnicity = VariableContentSerializer(required=False)
  sex = VariableContentSerializer(required=False)

  # health variables
  gait_speed = VariableContentSerializer(required=False)  
  grip_dom = VariableContentSerializer(required=False)
  grip_ndom = VariableContentSerializer(required=False)
  FI_ADL = VariableContentSerializer(required=False)
  FI_IADL = VariableContentSerializer(required=False)
  chair = VariableContentSerializer(required=False)
  leg_raise = VariableContentSerializer(required=False)
  full_tandem = VariableContentSerializer(required=False)
  srh = VariableContentSerializer(required=False)
  eye = VariableContentSerializer(required=False)
  hear = VariableContentSerializer(required=False)
  func = VariableContentSerializer(required=False)
  dias = VariableContentSerializer(required=False)
  sys = VariableContentSerializer(required=False)
  pulse = VariableContentSerializer(required=False)
  trig = VariableContentSerializer(required=False)
  crp = VariableContentSerializer(required=False)
  hdl = VariableContentSerializer(required=False)
  ldl = VariableContentSerializer(required=False)
  glucose = VariableContentSerializer(required=False)
  igf1 = VariableContentSerializer(required=False)
  hgb = VariableContentSerializer(required=False)
  fib = VariableContentSerializer(required=False)
  fer = VariableContentSerializer(required=False)
  chol = VariableContentSerializer(required=False)
  wbc = VariableContentSerializer(required=False)
  mch = VariableContentSerializer(required=False)
  hba1c = VariableContentSerializer(required=False)
  vitd = VariableContentSerializer(required=False)

class PostSaveHealthDataSerializer(serializers.Serializer):
  last_question_number = serializers.IntegerField()
  to_save = PostHealthDataSerializer()

class SavedResponseSerializer(serializers.ModelSerializer):
  class Meta:
    model = models.SavedResponse
    exclude = ["id", "save_model"]