from rest_framework.authtoken.views import obtain_auth_token
from users import views
from django.urls import path

urlpatterns = [
    path("", views.UserView.as_view()),
    path("me/", views.UserViewWithToken.as_view()),
    path("token/", obtain_auth_token),
    path("<str:username>/", views.TargetUserView.as_view()),
]
