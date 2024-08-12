from users.serializers import PostUserSerializer, PutUserSerializer, UserSerializer, ResetPasswordRequestSerializer, ResetPasswordSerializer
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from users import models
from users.models import PasswordReset, User
from django.core.mail import send_mail
from django.conf import settings


class UserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PostUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            user = models.User.objects.create_user(
                email=serializer.validated_data["username"],
                password=serializer.validated_data["password"],
            )
        except IntegrityError:
            # email already in use in db
            return Response(status=status.HTTP_409_CONFLICT)

        token = Token.objects.create(user=user)
        response = {"userId": user.pk, "username": user.email, "token": token.key}
        return Response(response, status=status.HTTP_201_CREATED)


class TargetUserView(APIView):
    permission_classes = []
    parser_classes = [JSONParser, FormParser, MultiPartParser]

    def get(self, request, userId):
        user = get_object_or_404(models.User, pk=userId)
        if request.user.pk != user.pk and not request.user.is_superuser:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        response = {
            "userId": user.pk,
            "username": user.email,
            "dateJoined": user.date_joined,
            "isSuperuser": user.is_superuser,
        }
        return Response(response, status=status.HTTP_200_OK)

    def put(self, request, userId):
        user = get_object_or_404(models.User, pk=userId)
        if request.user.pk != user.pk and not request.user.is_superuser:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = PutUserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if "password" in serializer.validated_data:
            user.set_password(serializer.validated_data["password"])
        try:
            user.save()
        except IntegrityError:
            return Response(status=status.HTTP_409_CONFLICT)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, userId):
        user = get_object_or_404(models.User, pk=userId)
        if request.user.pk != user.pk and not request.user.is_superuser:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        user.delete()
        return Response(status=status.HTTP_200_OK)
    

class TargetUserUsernameView(APIView):
    permission_classes = []
    parser_classes = [JSONParser, FormParser, MultiPartParser]

    def get(self, request, email):
        user = get_object_or_404(models.User, email=email)
        if request.user.email != user.email and not request.user.is_superuser:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        response = {
            "userId": user.pk,
            "username": user.email,
            "dateJoined": user.date_joined,
            "isSuperuser": user.is_superuser,
        }
        return Response(response, status=status.HTTP_200_OK)


class UserViewWithToken(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        response = {
            "userId": request.user.pk,
            "username": request.user.email,
            "dateJoined": request.user.date_joined,
            "isSuperuser": request.user.is_superuser,
        }
        return Response(response, status=status.HTTP_200_OK)
    
class RequestPasswordReset(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ResetPasswordRequestSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        #email = request.data['email']
        email = "bobdylan@gmail.com"
        user = User.objects.filter(email__iexact=email).first()

        if user:
            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user) 
            reset = PasswordReset(email=email, token=token)
            reset.save()

            send_mail(
                "Token",
                token,
                settings.EMAIL_HOST_USER,
                ["tyjarrett71@gmail.com"],
                fail_silently=False,
            )

            return Response({'success': 'We have sent you a link to reset your password ' + token}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "User with credentials not found"}, status=status.HTTP_404_NOT_FOUND)

class ResetPassword(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = []

    def post(self, request, token):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        
        new_password = data['new_password']
        confirm_password = data['confirm_password']
        
        if new_password != confirm_password:
            return Response({"error": "Passwords do not match"}, status=400)
        
        print(token)
        
        reset_obj = PasswordReset.objects.filter(token=token).first()
        
        if not reset_obj:
            return Response({'error':'Invalid token'}, status=400)
        
        user = User.objects.filter(email=reset_obj.email).first()
        
        if user:
            user.set_password(request.data['new_password'])
            user.save()
            
            reset_obj.delete()
            
            return Response({'success':'Password updated'})
        else: 
            return Response({'error':'No user found'}, status=404)