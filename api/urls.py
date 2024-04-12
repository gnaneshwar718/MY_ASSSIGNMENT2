from django.urls import path
from .views import (
    PostListCreateView,
    PostLikeView,
    PostShareView,
    PostCommentView,
    RetrieveView,
    UserRegistrationView,
    UserLoginView,
    UserLogoutView,
)

urlpatterns = [
    path('postscreate/', PostListCreateView.as_view(), name='post-list-create'),
    path('postlist/', RetrieveView.as_view(), name='post-retrieve-update-destroy'),
    path('posts/<int:pk>/like/', PostLikeView.as_view(), name='post-like'),
    path('posts/<int:pk>/share/', PostShareView.as_view(), name='post-share'),
    path('posts/<int:pk>/comment/', PostCommentView.as_view(), name='post-comment'),
    path('posts/<int:pk>/', RetrieveView.as_view(), name='post-view'),
    path('register/', UserRegistrationView.as_view(), name='user_register'),
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('logout/', UserLogoutView.as_view(), name='user_logout'),
]
