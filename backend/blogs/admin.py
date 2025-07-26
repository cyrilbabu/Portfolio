from django.contrib import admin
from .models import Blog , BlogImage, BlogComment, BlogContent

@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title')

@admin.register(BlogImage)
class BlogImageAdmin(admin.ModelAdmin):
    list_display = ('blog', 'image')
    search_fields = ('blog__title',)

@admin.register(BlogComment)
class BlogCommentAdmin(admin.ModelAdmin):
    list_display = ('blog', 'user', 'created_at')
    search_fields = ('blog__title',)

@admin.register(BlogContent)
class BlogContentAdmin(admin.ModelAdmin):
    list_display = ('blog', )
    search_fields = ('blog__title',)
    ordering = ('-created_at',)
    
    
