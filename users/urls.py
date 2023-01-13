from django.urls import path, include
from django.conf import settings
from users import views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('profile/', views.UserProfile, name='profile'),
    path('profile/update', views.updateUserProfile, name='profile_update'),
    path('all/', views.getUsers, name='user'),
    path('register/', views.userRegistration, name='registration'),
]

