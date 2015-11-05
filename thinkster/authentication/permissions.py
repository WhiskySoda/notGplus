from rest_framework import permissions


#### a simple permission extending Django Rest Framework base permission to return true or false depending on whether the user owns the account or not - the 'has object' permission.

class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, account):
        #### if the request has a user - if they're not authenticated, then it can't be their account!
        if request.user:
            return account == request.user
        return False
    