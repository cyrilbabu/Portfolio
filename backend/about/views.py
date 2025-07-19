from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SkillDomain , Achievement, Certifications , Project
from .serializers import SkillDomainSerializer, AchievementSerializer, CertificationsSerializer, ProjectSerializer
from rest_framework import status
from .models import Experience
from .serializers import ExperienceSerializer

class SkillDomainListView(APIView):
    def get(self, request):
        domains = SkillDomain.objects.all()
        serializer = SkillDomainSerializer(domains, many=True)
        return Response( serializer.data, status=status.HTTP_200_OK)

class AchievementListView(APIView):
    def get(self, request):
        achievements = Achievement.objects.all().order_by('-date')
        serializer = AchievementSerializer(achievements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    
    
class CertificationsListView(APIView):
    def get(self, request):
        certifications = Certifications.objects.all().order_by('-date')
        serializer = CertificationsSerializer(certifications, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    

class ExperienceListView(APIView):
    def get(self, request):
        experiences = Experience.objects.all()
        serializer = ExperienceSerializer(experiences, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    
    
class ProjectListView(APIView):
    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    