from rest_framework.authtoken.views import obtain_auth_token
from users import views
from django.urls import path

urlpatterns = [
    path("", views.UserView.as_view()),
    path("me/", views.UserViewWithToken.as_view()),
    path("token/", obtain_auth_token),
    path("user/<int:userId>/", views.TargetUserView.as_view()),
    path("user/<str:email>/", views.TargetUserUsernameView.as_view()),
    path("reset/", views.RequestPasswordReset.as_view()),
]
