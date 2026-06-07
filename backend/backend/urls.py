"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from pages.viewsets import (
    ServiceViewSet, ContactMessageViewSet, 
    AppointmentViewSet, AppointmentDayViewSet, AvailableHoursViewSet, TeamViewSet,
    BulletinViewSet, EventViewSet, EventBookingViewSet
)
from blogs.viewsets import BlogViewSet

router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'appointment-days', AppointmentDayViewSet, basename='appointment-day')
router.register(r'available-hours', AvailableHoursViewSet, basename='available-hours')
router.register(r'team', TeamViewSet, basename='team')
router.register(r'blogs', BlogViewSet, basename='blog')
router.register(r'bulletins', BulletinViewSet, basename='bulletin')
router.register(r'events', EventViewSet, basename='event')
router.register(r'event-bookings', EventBookingViewSet, basename='event-booking')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('ckeditor5/', include('django_ckeditor_5.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

