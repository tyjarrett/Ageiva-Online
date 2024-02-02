from users.serializers import PostUserSerializer, PutUserSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.db.utils import IntegrityError
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from users import models


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
