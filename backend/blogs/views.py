from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Blog, BlogImage, BlogContent
from .serializers import BlogSerializer, BlogSerializerforOne
from rest_framework import status
from django.core.paginator import Paginator
from rest_framework.permissions import AllowAny
import os
from dotenv import load_dotenv


load_dotenv()
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

        blogs = Blog.objects.all().order_by('-created_at')
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


class BlogCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        
        # password = os.getenv('BLOG_CREATION_PASSWORD')
        # print("Password from env:", password)
        # print("Data password:", data.get('password'))

        # # Compare provided password with environment password
        # if data.get('password') != password:
        #     return Response({"error": "Invalid password"}, status=status.HTTP_403_FORBIDDEN)

        # Create the Blog instance
        blog_serializer = BlogSerializerforOne(data=data)
        if blog_serializer.is_valid():
            blog = blog_serializer.save()

            # Create BlogImage instances
            images = data.get('images', [])
            for image_data in images:
                BlogImage.objects.create(blog=blog, **image_data)

            # Create BlogContent instances
            contents = data.get('contents', [])
            for content_data in contents:
                BlogContent.objects.create(blog=blog, **content_data)

            return Response({"message": "Blog created successfully", "blog_id": blog.id}, status=status.HTTP_201_CREATED)
        else:
            return Response(blog_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogUpdateMetricsView(APIView):
    def post(self, request, pk):
        try:
            blog = Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            raise Http404

        metrics = request.data.get('metrics', {})
        blog.likes += metrics.get('likes', 0)
        blog.views += metrics.get('views', 0)
        blog.shares += metrics.get('shares', 0)
        blog.comments_count += metrics.get('comments_count', 0)
        blog.save()

        return Response({"message": "Metrics updated successfully"}, status=status.HTTP_200_OK)
