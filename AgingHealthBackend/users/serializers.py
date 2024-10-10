from rest_framework import serializers
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    userId = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["userId", "email", "profile_img"]

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

class ResetPasswordRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    
class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.RegexField(
        regex=r'^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
        write_only=True,
        error_messages={'invalid': ('Password must be at least 8 characters long with at least one capital letter and symbol')})
    confirm_password = serializers.CharField(write_only=True, required=True)
