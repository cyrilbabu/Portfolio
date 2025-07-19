from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer, BlogSerializerforOne
from rest_framework import status
from django.core.paginator import Paginator

# Create your views here.

class BlogDetailView(APIView):
    def get(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            raise Http404
        serializer = BlogSerializerforOne(blog)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BlogListView(APIView):
    def get(self, request):
        category = request.query_params.get('category', None)
        title = request.query_params.get('title', None)
        page = request.query_params.get('page', 1)

        blogs = Blog.objects.all()
        if category:
            blogs = blogs.filter(category__icontains=category)
        if title:
            blogs = blogs.filter(title__icontains=title)

        paginator = Paginator(blogs, 10)  # 10 blogs per page
        paginated_blogs = paginator.get_page(page)

        serializer = BlogSerializer(paginated_blogs, many=True)
        return Response({
            'blogs': serializer.data,
            'total_pages': paginator.num_pages,
            'current_page': paginated_blogs.number
        }, status=status.HTTP_200_OK)
