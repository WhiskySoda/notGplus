from django.db import models

from authentication.models import Account


class Post(models.Model):
    ##### Because each Account can have many Post objects, we need to set up a many-to-one relation.
    author = models.ForeignKey(Account)
    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.content