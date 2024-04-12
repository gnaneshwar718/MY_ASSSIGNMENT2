from django.urls import path
from .views import index

urlpatterns = [
    # Map multiple URL patterns to the index view
    path('', index),
    path('post/', index),  # Note: Added trailing slashes to URL patterns
    path('posts/create/', index),
    path('analytics/', index),
    path('postslist/', index),
    
    path('posts/<int:pk>/', index),  # Note: Use <> syntax for capturing dynamic parts of the URL
] 