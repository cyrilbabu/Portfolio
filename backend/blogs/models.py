from django.db import models

category_choices = [
  "All",
  "What I Doing",
  "AI ML Realated",
  "What I Learned",
  "What I Built",
  "Job Related",
];

category_choices = [(choice, choice) for choice in category_choices]

class Blog(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField()
    content = models.TextField()
    
    thumbnail = models.ImageField(upload_to='blog_thumbnails/', null=True, blank=True)
    video = models.URLField(null=True, blank=True)
    
    category = models.CharField(max_length=50, choices=category_choices, default="All")
    
    url = models.URLField(null=True, blank=True)
    url_text = models.CharField(max_length=200, null=True, blank=True)
    
    likes = models.PositiveIntegerField(default=0)
    views = models.PositiveIntegerField(default=0)
    shares = models.PositiveIntegerField(default=0)
    comments_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class BlogImage(models.Model):
    id=models.AutoField(primary_key=True)
    blog = models.ForeignKey(Blog, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='blog_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.blog.title}"
 
class BlogComment(models.Model):
    blog = models.ForeignKey(Blog, related_name='comments', on_delete=models.CASCADE)
    user = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user} on {self.blog.title}"        
    
class BlogContent(models.Model):
    id= models.AutoField(primary_key=True)
    blog = models.ForeignKey(Blog, related_name='contents', on_delete=models.CASCADE)
    heading = models.CharField(max_length=200)
    url = models.URLField(null=True, blank=True)
    url_text = models.CharField(max_length=200, null=True, blank=True)
    subtitle = models.CharField(max_length=200, null=True, blank=True)
    content = models.TextField()
    image = models.ImageField(upload_to='blog_content_images/', null=True, blank=True)
    video = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Content for {self.blog.title}" 
         