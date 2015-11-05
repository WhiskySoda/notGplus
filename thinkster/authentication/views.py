from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer

import json
from django.contrib.auth import authenticate, login, logout

class AccountViewSet(viewsets.ModelViewSet):
    ### syntactic sugar for the url and this replaces the ID attribute
    lookup_field = 'username' 
    
    queryset = Account.objects.all()
    serializerClass = AccountSerializer
    
    #### SAFE METHODS is an array exposed by Django Restframework

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
            
        #### This allows anyone to acccess this API endpoint!! Anyone can create an account.          
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)
        #### ensures that only the account owner can make POST requests    
        return (permissions.IsAuthenticated(), IsAccountOwner(),)
        
    def create(self, request):
        ##### When you create an object using the serializer's .save() method, the object's attributes are set literally. 
        ##### This means that a user registering with the password 'password' will have their password stored as 'password'. This is bad.
        ##### We solve this problem by overriding the .create() method for this viewset and using Account.objects.create_user() to create the Account object.
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)
            
            return Response(seralier.validated_data, status=status.HTTP_201_CREATED)
            
            
        return Response({
            'status': 'Bad Request',
            'message' : 'Account could not be created with received data.'
            }, status=status.HTTP_400_BAD_REQUEST)
    
    

##### we need overwrite the post method. 
class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('email', None)
        password = data.get('password', None)
        #### goes into body of the post, looks for the body, then gets the e-mai and password key.
        #### if it does, it returns the account.
        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)
                ## then return the users information
                ## status defaults to success 200
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled.'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'message': 'Username/password combination invalid.'
            }, status=status.HTTP_401_UNAUTHORIZED)    
            


class LogoutView(views.APIView):
    #### Only authenticated users should be able to hit this endpoint. Django REST Framework's permissions.IsAuthenticated handles this for us. 
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        #### If the user is authenticated, all we need to do is call Django's logout() method.
        logout(request)
        #### There isn't anything reasonable to return when logging out, so we just return an empty response with a 200 status code.
        return Response({}, status=status.HTTP_204_NO_CONTENT)