from rest_framework import serializers
from .models import Blog, BlogImage, BlogContent

class BlogImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogImage
        fields = ['image']

class BlogContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogContent
        fields = ['heading', 'url', 'url_text', 'subtitle', 'content', 'image', 'video']

class BlogSerializerforOne(serializers.ModelSerializer):
    images = BlogImageSerializer(many=True, read_only=True)
    contents = BlogContentSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = "__all__"