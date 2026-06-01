from django.contrib import admin
from .models import Service, ServiceImage, ContactMessage, Appointment, AppointmentDay, AvailableHours, Team, Blog


admin.site.site_header = "NIAC Admin"
admin.site.site_title = "NIAC Admin Portal"
admin.site.index_title = "Welcome to NIAC"


class ServiceImageInline(admin.TabularInline):
    model = ServiceImage
    extra = 3
    fields = ['image', 'title', 'description', 'order']
    ordering = ['order']


class AvailableHoursInline(admin.TabularInline):
    """Inline editing for available hours within AppointmentDay"""
    model = AvailableHours
    extra = 1
    fields = ['start_time', 'end_time']
    ordering = ['start_time']


class AppointmentDayAdmin(admin.ModelAdmin):
    """Admin for appointment days with inline available hours"""
    list_display = ['get_day_display', 'is_active', 'window_count']
    list_filter = ['is_active']
    fields = ['day_of_week', 'is_active']
    inlines = [AvailableHoursInline]
    ordering = ['day_of_week']
    
    def get_day_display(self, obj):
        return obj.get_day_of_week_display()
    get_day_display.short_description = 'Day'
    
    def window_count(self, obj):
        count = obj.available_hours.count()
        return f'{count} window{"s" if count != 1 else ""}'
    window_count.short_description = 'Time Windows'


class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'featured_image_preview', 'gallery_count']
    fields = ['name','excerpt', 'description', 'featured_image']
    search_fields = ['name', 'description']
    inlines = [ServiceImageInline]
    
    def featured_image_preview(self, obj):
        if obj.featured_image:
            return f'✓ Image uploaded'
        return 'No image'
    featured_image_preview.short_description = 'Featured Image'
    
    def gallery_count(self, obj):
        count = obj.gallery_images.count()
        return f'{count} image{"s" if count != 1 else ""}'
    gallery_count.short_description = 'Gallery Images'

class ServiceImageAdmin(admin.ModelAdmin):
    list_display = ['service', 'title', 'order', 'image_preview']
    list_filter = ['service', 'created_at']
    search_fields = ['title', 'description', 'service__name']
    
    def image_preview(self, obj):
        if obj.image:
            return '✓ Image uploaded'
        return 'No image'
    image_preview.short_description = 'Image'


class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'created_at', 'is_read', 'preview']
    list_filter = ['created_at', 'is_read']
    search_fields = ['name', 'email', 'message']
    readonly_fields = ['name', 'email', 'message', 'created_at']
    fields = ['name', 'email', 'message', 'created_at', 'is_read']
    
    def preview(self, obj):
        return obj.message[:50] + '...' if len(obj.message) > 50 else obj.message
    preview.short_description = 'Message Preview'
    
    def has_add_permission(self, request):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser


admin.site.register(Service, ServiceAdmin)
admin.site.register(ServiceImage, ServiceImageAdmin)
admin.site.register(ContactMessage, ContactMessageAdmin)


class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['client_name', 'appointment_date', 'appointment_time', 'status', 'service', 'confirmation_status']
    list_filter = ['status', 'appointment_date', 'service', 'created_at']
    search_fields = ['client_name', 'client_email', 'client_phone']
    readonly_fields = ['id', 'created_at', 'updated_at', 'confirmation_sent']
    fields = [
        'id', 'client_name', 'client_email', 'client_phone',
        'service', 'appointment_date', 'appointment_time',
        'duration_minutes', 'notes', 'status', 'confirmation_sent',
        'created_at', 'updated_at'
    ]
    
    def confirmation_status(self, obj):
        return '✓ Sent' if obj.confirmation_sent else '✗ Not sent'
    confirmation_status.short_description = 'Confirmation Email'


admin.site.register(Appointment, AppointmentAdmin)
admin.site.register(AppointmentDay, AppointmentDayAdmin)
admin.site.register(Team)


class BlogAdmin(admin.ModelAdmin):
    list_display = ['title', 'published_date', 'category', 'is_published', 'featured_image_preview']
    list_filter = ['is_published', 'published_date', 'category', 'author']
    search_fields = ['title', 'excerpt', 'content', 'author', 'category']
    readonly_fields = ['id', 'slug', 'published_date', 'updated_date', 'created_at']
    fieldsets = (
        ('Blog Information', {
            'fields': ('title', 'slug', 'excerpt', 'author')
        }),
        ('Content', {
            'fields': ('content', 'featured_image')
        }),
        ('Organization', {
            'fields': ('category', 'is_published')
        }),
        ('Metadata', {
            'fields': ('id', 'published_date', 'updated_date', 'created_at'),
            'classes': ('collapse',)
        }),
    )
    ordering = ['-published_date']
    
    def featured_image_preview(self, obj):
        if obj.featured_image:
            return '✓ Image uploaded'
        return '✗ No image'
    featured_image_preview.short_description = 'Featured Image'


admin.site.register(Blog, BlogAdmin)
