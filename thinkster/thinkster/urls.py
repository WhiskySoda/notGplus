from django.conf.urls import include, patterns, url
from rest_framework_nested import routers
from django.contrib import admin
from authentication.views import AccountViewSet
from thinkster.views import IndexView
from authentication.views import LoginView, LogoutView

from posts.views import AccountPostsViewSet, PostViewSet
######
router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
#######
#######
router.register(r'posts', PostViewSet)

###  Both URLS go to /accounts but this does not upset Django, it only matches the first it finds,
#### What we are doing is adding in accounts/posts/
#### Django is smart enough to know the foreign key we've set up here should be reversible. 
#### That is to say, given a Account, you should be able to access that user's Posts. 
#### In Django these Post objects can be accessed through Account.post_set (not Account.posts).

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'posts', AccountPostsViewSet)
######


urlpatterns = patterns(
    '',
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),
    url(r'^api/v1/', include(accounts_router.urls)),
    ##### we need a nested router which is currently not supported by the standard Django Rest FrameWork
    url(r'^/api/v1/', include (router.urls)), 
    url(r'^admin/', include(admin.site.urls)),
    url('^.*$', IndexView.as_view(), name='index'),
)
