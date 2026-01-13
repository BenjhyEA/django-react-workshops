from django.urls import include, path
from rest_framework import routers

from workshops import views

router = routers.DefaultRouter()
router.register(r'workshop',views.WorkshopView, 'worshop')
router.register(r'category',views.CategoryView, 'category')

urlpatterns = [
    path("api/v1/", include(router.urls))
]

