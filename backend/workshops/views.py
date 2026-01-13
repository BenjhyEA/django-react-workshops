from django.shortcuts import render
from rest_framework import viewsets
from .models import Category, Workshop
from .serializer import CategorySerializer, WorkshopSerializer

class WorkshopView(viewsets.ModelViewSet):
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()
    
class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    
