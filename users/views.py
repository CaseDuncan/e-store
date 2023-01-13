from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from users.serializers import UserSerializer, UserSerializerWithToken
# Create your views here.
class getTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        #attach more claims to the token
        # data['username'] = self.user.username
        # data['email'] = self.user.email
        # data['is_staff'] = self.user.is_staff
        serializer = UserSerializerWithToken(self.user).data
        for field, value in serializer.items():
            data[field] = value
        return data
        

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = getTokenObtainPairSerializer


#new user resgistration
@api_view(['POST'])
def userRegistration(request):
    data = request.data

    try:
        user = User.objects.create(
            first_name = data['first_name'],
            last_name = data['last_name'],
            username = data['username'],
            email= data['email'],
            password = make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except:
        message = {
            'error':'user profile could not be created'
        }
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

#update user profile
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data

    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.username = data['username']
    user.email= data['email']

    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()

    return Response(serializer.data)

#fetch all users from DB
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)