# Example for urls.py
from django.urls import path
from .views import SkillDomainListView, AchievementListView, CertificationsListView, ExperienceListView, ProjectListView

urlpatterns = [
    path('skills/', SkillDomainListView.as_view(), name='skill-domain-list'),
    path('achievements/', AchievementListView.as_view(), name='achievement-list'),
    path('certifications/', CertificationsListView.as_view(), name='certification-list'),
    path('experiences/', ExperienceListView.as_view(), name='experience-list'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
]