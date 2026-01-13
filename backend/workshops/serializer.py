from .models import Category, Workshop
from rest_framework import serializers

class WorkshopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workshop
        fields = '__all__'
    
