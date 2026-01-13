from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    
    def __str__(self):
        return self.name
    
class Workshop(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_date = models.DateTimeField()
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="workshops"
    )
    
    def __str__(self):
        return self.name