from django.urls import include, path
from rest_framework import routers

from workshops import views

router = routers.DefaultRouter()
router.register(r'workshop',views.WorkshopView, 'worshop')

urlpatterns = [
    path("api/v1/", include(router.urls))
]

