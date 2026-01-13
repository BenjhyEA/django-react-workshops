from django.contrib import admin

from .models import Category, Workshop

# Register your models here.
admin.site.register(Workshop)
admin.site.register(Category)