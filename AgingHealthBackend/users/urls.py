from rest_framework.authtoken.views import obtain_auth_token
from users import views
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path("", views.UserView.as_view()),
    path("me/", views.UserViewWithToken.as_view()),
    path("token/", obtain_auth_token),
    path("user/<int:userId>/", views.TargetUserView.as_view()),
    path("user/<str:email>/", views.TargetUserUsernameView.as_view()),
    path("resetrequest/<str:email>/", views.RequestPasswordReset.as_view()),
    path("resettoken/<str:token>/", views.ResetPasswordToken.as_view()),
    path("reset/<str:token>/", views.ResetPassword.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
