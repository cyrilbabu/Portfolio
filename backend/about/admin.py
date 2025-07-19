from django.contrib import admin
from .models import SkillDomain, Skill, Achievement, Certifications, Experience, ExperienceTimeline, Project, ProjectImage

admin.site.register(SkillDomain)
admin.site.register(Skill)
admin.site.register(Achievement)
admin.site.register(Certifications)
admin.site.register(Project)
admin.site.register(ProjectImage)
admin.site.register(Experience)
admin.site.register(ExperienceTimeline)
