from rest_framework import permissions, viewsets
from rest_framework.response import Response

from posts.models import Post
from posts.permissions import IsAuthorOfPost
from posts.serializers import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.order_by('-created_at')
    serializer_class = PostSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            #### lets anyone see the post
            return (permissions.AllowAny(),)
            ### otherwis they need to be authenticated and is the author of the post
        return (permissions.IsAuthenticated(), IsAuthorOfPost(),)


##### When a Post object is created it has to be associated with an author. Making the author type in their own username or id when creating adding a post to the site 
##### would be a bad experience, so we handle this association for them with the perform_create hook. We simply grab the user associated with this request 
##### and make them the author of this Post.


def perform_create(self, serializer):
    instance = serializer.save(author=self.request.user)

    return super(PostViewSet, self).perform_create(serializer)


##### gets all the posts of the author
class AccountPostsViewSet(viewsets.ViewSet):
    queryset = Post.objects.select_related('author').all()
    serializer_class = PostSerializer
    
    ### Overwriting the list method. account username comes from the URLS, not here.
    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)