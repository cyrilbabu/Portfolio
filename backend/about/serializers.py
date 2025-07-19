from rest_framework import serializers
from .models import Achievement, Skill, SkillDomain, Certifications , Experience, ExperienceTimeline, Project, ProjectImage

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['image', 'name',  'level']

class SkillDomainSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True) 

    class Meta:
        model = SkillDomain
        fields = ['id', 'domain', 'prority', 'skills']
        
class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ['title', 'description', 'logo',  'date', 'created_at']        

class CertificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certifications
        fields = ['title', 'description', 'image', 'date', 'issuer', 'issuer_logo', 'created_at']        


class ExperienceTimelineSerializer(serializers.ModelSerializer):
    skills_used = SkillSerializer(many=True, read_only=True)
    experience = serializers.StringRelatedField()
    
    class Meta:
        model = ExperienceTimeline
        fields = ['start_date', 'end_date', 'description', 'skills_used', 'job_role', 'experience', 'created_at']

class ExperienceSerializer(serializers.ModelSerializer):
    timelines = ExperienceTimelineSerializer(many=True, read_only=True)
    class Meta:
        model = Experience
        fields = ['company_name', 'company_logo', 'location', 'timelines', 'created_at']
        
class ProjectImageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProjectImage
        fields = ['image']        
        
class ProjectSerializer(serializers.ModelSerializer):
    skills_used = SkillSerializer(many=True, read_only=True)
    images = ProjectImageSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['title', 'description', 'github_link', 'live_link', 'skills_used', 'images', 'created_at', 'subtitle', 'start_date', 'end_date']

