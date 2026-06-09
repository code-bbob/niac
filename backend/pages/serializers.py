from rest_framework import serializers
from .models import Service, ServiceImage, ContactMessage, Appointment, AppointmentDay, AvailableHours, Team, Bulletin, Event, EventBooking


class ServiceImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ServiceImage
        fields = ['id', 'image', 'image_url', 'title', 'description', 'order']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ServiceSerializer(serializers.ModelSerializer):
    featured_image_url = serializers.SerializerMethodField()
    gallery_images = ServiceImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Service
        fields = ['id', 'name', 'slug', 'description', 'featured_image', 'featured_image_url', 'gallery_images']
    
    def get_featured_image_url(self, obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
            return obj.featured_image.url
        return None


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'phone', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']


class AvailableHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableHours
        fields = ['id', 'day', 'start_time', 'end_time']


class AppointmentDaySerializer(serializers.ModelSerializer):
    day_display = serializers.CharField(source='get_day_of_week_display', read_only=True)
    available_hours = AvailableHoursSerializer(many=True, read_only=True)
    
    class Meta:
        model = AppointmentDay
        fields = ['id', 'day_of_week', 'day_display', 'is_active', 'available_hours']


class AppointmentSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(source='service.name', read_only=True)
    
    class Meta:
        model = Appointment
        fields = [
            'id', 'client_name', 'client_email', 'client_phone', 
            'service', 'service_name', 'appointment_date', 
            'appointment_time', 'duration_minutes', 'notes', 'status', 
            'created_at', 'updated_at', 'confirmation_sent'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'confirmation_sent']


class TeamSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = [
            'id', 'full_name', 'slug', 'category', 'job_title', 'short_bio', 'professional_background',
            'email', 'phone', 'photo', 'photo_url', 'order', 
            'is_active', 'specializations', 'created_at', 'updated_at', 'panelist', 'about'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']
    
    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.photo.url)
            return obj.photo.url
        return None


class BulletinSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Bulletin
        fields = ['id', 'title', 'image', 'image_url', 'description', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class EventSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Event 
        fields = ['id', 'title', 'slug', 'description', 'featured_image', 'image_url', 'order', 'event_start_date', 'event_end_date', 'early_bird_price', 'ticket_price', 'bank_number', 'swift_code']

    def get_image_url(self,obj):
        if obj.featured_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.featured_image.url)
            return obj.featured_image.url
        return None


class EventBookingSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source='event.title', read_only=True)

    class Meta:
        model = EventBooking
        fields = [
            'id', 'event', 'event_title', 'spaces', 'name', 'email',
            'address', 'city', 'state', 'zip_code', 'country', 'phone',
            'comment', 'company', 'reference_code', 'is_verified'
        ]
        read_only_fields = ['id', 'is_verified']
