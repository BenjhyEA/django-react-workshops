from django.shortcuts import render
from rest_framework import viewsets
from .models import Workshop
from .serializer import WorkshopSerializer

class WorkshopView(viewsets.ModelViewSet):
    serializer_class = WorkshopSerializer
    queryset = Workshop.objects.all()
