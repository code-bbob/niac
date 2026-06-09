from django.db import models
from django_ckeditor_5.fields import CKEditor5Field
from datetime import datetime, timedelta
import uuid
from django.utils.text import slugify

# Create your models here.

class Appointment(models.Model):
    """Appointment booking model"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client_name = models.CharField(max_length=255)
    client_email = models.EmailField()
    client_phone = models.CharField(max_length=20)
    service = models.ForeignKey('Service', on_delete=models.SET_NULL, null=True, blank=True)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    duration_minutes = models.IntegerField(default=60, help_text="Duration in minutes")
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    confirmation_sent = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Appointment - {self.client_name} ({self.appointment_date} {self.appointment_time})"
    
    class Meta:
        ordering = ['-appointment_date', '-appointment_time']
        unique_together = ['appointment_date', 'appointment_time']
        verbose_name_plural = "Appointments"


class AppointmentDay(models.Model):
    """Define appointment availability for each day of the week"""
    DAY_CHOICES = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    ]
    
    day_of_week = models.IntegerField(choices=DAY_CHOICES, unique=True)
    is_active = models.BooleanField(default=True, help_text="Whether appointments can be booked on this day")
    
    def __str__(self):
        return f"{self.get_day_of_week_display()}"
    
    class Meta:
        verbose_name_plural = "Appointment Days"
        ordering = ['day_of_week']


class AvailableHours(models.Model):
    """Define available appointment time windows within a day"""
    day = models.ForeignKey(AppointmentDay, on_delete=models.CASCADE, related_name='available_hours')
    start_time = models.TimeField(help_text="Window start time (e.g., 9:00 AM)")
    end_time = models.TimeField(help_text="Window end time (e.g., 11:00 AM)")
    
    def __str__(self):
        return f"{self.day.get_day_of_week_display()} - {self.start_time} to {self.end_time}"
    
    class Meta:
        verbose_name_plural = "Available Hours"
        ordering = ['day', 'start_time']
        unique_together = ['day', 'start_time', 'end_time']


class Service(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True, help_text="URL-friendly identifier")
    description = CKEditor5Field()
    featured_image = models.ImageField(upload_to='services/', null=True, blank=True, help_text="Main image displayed at the top of the page")
    excerpt = models.TextField(max_length=500, blank=True, help_text="Short summary of the service (max 500 characters)")

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            
            # Handle duplicates by adding a number suffix
            counter = 1
            while Service.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            self.slug = slug
        
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Services"


class ServiceImage(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='services/gallery/')
    title = models.CharField(max_length=255, blank=True, help_text="Optional title for the image")
    description = models.CharField(max_length=500, blank=True, help_text="Optional description for the image")
    order = models.PositiveIntegerField(default=0, help_text="Order of images in gallery (lower numbers appear first)")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.service.name} - {self.title or 'Gallery Image'}"
    
    class Meta:
        ordering = ['order', '-created_at']
        verbose_name_plural = "Service Images"


class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, help_text="Client phone number")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"
    
    class Meta:
        verbose_name_plural = "Contact Messages"
        ordering = ['-created_at']


class Team(models.Model):
    """Team Member model"""
    full_name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, help_text="URL-friendly identifier")
    category = models.CharField(max_length=100, blank=True, help_text="e.g., Patron in Chief, Executive Committe, Founders, etc")
    job_title = models.CharField(max_length=255, null=True, blank=True, help_text="e.g., Senior Team, Junior Team, Paralegal")
    about = models.TextField(blank=True, help_text="Details on experience, education, bio, etc")
    short_bio = models.TextField(blank=True, max_length=1000, help_text="Brief personal statement or tagline (max 1000 characters)")
    professional_background = models.TextField(blank=True, help_text="professional background ")
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    photo = models.ImageField(upload_to='team/', blank=True, help_text="Professional photo of the team member")
    order = models.PositiveIntegerField(default=0, help_text="Order of appearance on the team page (lower numbers appear first)")
    is_active = models.BooleanField(default=True, help_text="Whether to display this team member on the website")
    specializations = models.CharField(max_length=500, blank=True, help_text="Comma-separated list of service")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    panelist = models.CharField(max_length=255, blank=True, help_text="Panelist role or title if applicable (e.g., National Arbitrational Panelist, International Arbitrational Panelist, National Mediation Panelist, etc)")

    def __str__(self):
        return f"{self.full_name} - {self.job_title}" 
    
    def save(self, *args, **kwargs):
        if not self.slug:
            # Generate slug from full_name
            base_slug = self.full_name.lower().replace(' ', '-').replace('.', '').replace("'", '')
            base_slug = ''.join(c for c in base_slug if c.isalnum() or c == '-')
            slug = base_slug
            
            # Handle duplicates by adding a number suffix
            counter = 1
            while Team.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            self.slug = slug
        
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Teams"
        ordering = ['order', 'full_name']


class Blog(models.Model):
    """Blog post model"""
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, help_text="URL-friendly identifier")
    # author = models.CharField(max_length=255, help_text="Name of the blog author")
    author = models.ManyToManyField(Team, related_name='blogs', blank=True, help_text="Select one or more team members as authors of this blog post")
    featured_image = models.ImageField(upload_to='blogs/', null=True, blank=True, help_text="Featured image for the blog post")
    excerpt = models.TextField(max_length=500, help_text="Short summary of the blog post")
    content = CKEditor5Field(help_text="Main content of the blog post")
    category = models.CharField(max_length=100, blank=True, help_text="Blog category/topic")
    published_date = models.DateField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True, help_text="Whether this blog is visible on the website")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            
            # Handle duplicates by adding a number suffix
            counter = 1
            while Blog.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            self.slug = slug
        
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Blogs"
        ordering = ['-published_date']
        indexes = [
            models.Index(fields=['-published_date']),
            models.Index(fields=['slug']),
            models.Index(fields=['is_published']),
        ]


class Bulletin(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='bulletins/', help_text="Bulletin image/notice")
    description = models.TextField(blank=True, help_text="Optional description")
    is_active = models.BooleanField(default=True, help_text="Whether to display this bulletin on the website")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Bulletins"
        ordering = ['-created_at']


class Event(models.Model):

    title = models.CharField(max_length=500)
    slug = models.SlugField(max_length=255, unique=True, help_text="URL-friendly identifier")
    description = CKEditor5Field()
    featured_image = models.ImageField(upload_to='events/')
    order = models.IntegerField(null=True,blank=True)
    event_start_date = models.DateField(null=True,blank=True)
    event_end_date = models.DateField(null=True, blank=True)
    early_bird_price = models.FloatField(blank=True,null=True)
    ticket_price = models.FloatField(blank=True,null=True)
    bank_number = models.CharField(max_length=255, blank=True, null=True)
    swift_code = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            
            # Handle duplicates by adding a number suffix
            counter = 1
            while Event.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            self.slug = slug
        
        super().save(*args, **kwargs)


class EventBooking(models.Model):

    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    spaces = models.PositiveIntegerField()
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    comment = models.TextField(null=True, blank=True)
    company = models.CharField(null=True, blank=True)
    reference_code = models.CharField(max_length=255, blank=True, null=True)
    is_verified = models.BooleanField(default=False)


    def __str__(self):
        return f"{self.name} - {self.phone}"
