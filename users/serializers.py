from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    is_admin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username','is_admin','first_name', 'last_name', 'email']

        #obj=the user object
    def get_is_admin(self, obj):
        return obj.is_staff

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'is_admin','first_name', 'last_name', 'email', 'token']


    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)