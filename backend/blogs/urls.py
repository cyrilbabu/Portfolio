from django.urls import path
from .views import (
    BlogListView, BlogDetailView, BlogCreateView, BlogUpdateMetricsView,
    UpdateWinnerView, CheckWinnerView, GetPriceDataView
)

urlpatterns = [
    path('', BlogListView.as_view(), name='blog-list'),
    path('<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),
    path('create/', BlogCreateView.as_view(), name='blog-create'),
    path('update-metrics/<int:pk>/', BlogUpdateMetricsView.as_view(), name='blog-update-metrics'),
    path('update-winner/', UpdateWinnerView.as_view(), name='update-winner'),
    path('check-winner/<uuid:pk>/', CheckWinnerView.as_view(), name='check-winner'),
    path('get-price/', GetPriceDataView.as_view(), name='get-price'),
]