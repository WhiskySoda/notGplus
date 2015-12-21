from rest_framework import serializers

from authentication.serializers import Account, AccountSerializer
from posts.models import Post


#####  We explicitly defined a number of fields in our AccountSerializer from before, but this definition is a little different. When serializing a Post object,
##### we want to include all of the author's information. Within Django REST Framework, this is known as a nested relationship. 
##### Basically, we are serializing the Account related to this Post and including it in our JSON. We pass read_only=True because we should not be
##### updating an Account object with a PostSerializer. We also set required=False here because we will set the author of this post automatically.

class PostSerializer(serializers.ModelSerializer):
    ### need this to serialize all the info about the author
    ### required = false - its not required because its going to be set automatically
    ### read only, to prevent changing the author when a post is made
    author = AccountSerializer(read_only=True, required=False)

    class Meta:
        model = Post

        fields = ('id', 'author', 'content', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_validation_exclusions(self, *args, **kwargs):
        exclusions = super(PostSerializer, self).get_validation_exclusions()
        ### plus a list with one item which is "author"
        return exclusions + ['author']
