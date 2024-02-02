from rest_framework import serializers
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    userId = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["userId", "email"]

    def get_userId(self, obj):
        return obj.id


class PostUserSerializer(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField()


class PutUserSerializer(serializers.Serializer):
    password = serializers.CharField(required=False)

    def validate(self, data):
        if len(data.keys()) == 0:
            raise serializers.ValidationError("Must include at least one field")
        return data
