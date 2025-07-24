from django.urls import path
from .views import BlogListView, BlogDetailView, BlogCreateView, BlogUpdateMetricsView

urlpatterns = [
    path('', BlogListView.as_view(), name='blog-list'),
    path('<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),
    path('create/', BlogCreateView.as_view(), name='blog-create'),
    path('update-metrics/<int:pk>/', BlogUpdateMetricsView.as_view(), name='blog-update-metrics'),
]
