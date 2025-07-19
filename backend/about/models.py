from django.db import models

# Create your models here.

class SkillDomain(models.Model):
    domain = models.CharField(max_length=100)
    prority = models.IntegerField(default=0)

    def __str__(self):
        return self.domain

class Skill(models.Model):
    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Expert', 'Expert'),
    ]

    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='skills/')
    level = models.CharField(max_length=50, choices=LEVEL_CHOICES, default='Expert')
    domain = models.ForeignKey(SkillDomain, on_delete=models.CASCADE, related_name='skills')

    def __str__(self):
        return self.name
    
class Achievement(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    logo = models.ImageField(upload_to='achievements/logos/')
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title    
    
class Certifications(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    issuer = models.CharField(max_length=100, blank=True, null=True)
    issuer_logo = models.ImageField(upload_to='certifications/logos/', blank=True, null=True)
    image = models.ImageField(upload_to='certifications/')
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class Experience(models.Model):
    company_name = models.CharField(max_length=100)
    company_logo = models.ImageField(upload_to='experience/logos/')
    location = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company_name}"    

class ExperienceTimeline(models.Model):
    experience = models.ForeignKey(Experience, on_delete=models.CASCADE, related_name='timelines')
    start_date = models.DateField()
    job_role = models.CharField(max_length=100, blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()
    skills_used = models.ManyToManyField(Skill, blank=True, related_name='experiences')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.job_role} - {self.start_date} to {self.end_date}"    
    
class Project(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200, blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField()
    github_link = models.URLField(blank=True, null=True)
    live_link = models.URLField(blank=True, null=True)
    skills_used = models.ManyToManyField(Skill, blank=True, related_name='projects')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
 
class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='project_images/')

    def __str__(self):
        return f"Image for {self.project.title}"        