from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token
from .views import current_user, UserRegisterView

urlpatterns = [
    path('current_user/', current_user),
    path('login/', obtain_jwt_token),
    path('api-token-verify', verify_jwt_token),
    path('create/', UserRegisterView.as_view())
]
