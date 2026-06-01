from django.test import TestCase, Client
from django.contrib.auth.models import User
from datetime import datetime, timedelta, date, time
from pages.models import Appointment, BusinessHours, Holiday, Service
import json


class AppointmentModelTest(TestCase):
    """Test the Appointment model"""

    def setUp(self):
        self.service = Service.objects.create(
            name="Contract Law",
            description="Contract law services"
        )

    def test_create_appointment(self):
        """Test creating an appointment"""
        appointment = Appointment.objects.create(
            client_name="John Doe",
            client_email="john@example.com",
            client_phone="+1-555-0123",
            service=self.service,
            appointment_date=date.today() + timedelta(days=5),
            appointment_time=time(10, 0),
            duration_minutes=60,
            notes="Test appointment"
        )
        self.assertEqual(appointment.client_name, "John Doe")
        self.assertEqual(appointment.status, "pending")

    def test_appointment_str(self):
        """Test appointment string representation"""
        appointment = Appointment.objects.create(
            client_name="Jane Doe",
            client_email="jane@example.com",
            client_phone="+1-555-0456",
            appointment_date=date.today() + timedelta(days=5),
            appointment_time=time(14, 0),
            duration_minutes=60
        )
        self.assertIn("Appointment - Jane Doe", str(appointment))


class BusinessHoursModelTest(TestCase):
    """Test the BusinessHours model"""

    def setUp(self):
        for day in range(5):
            BusinessHours.objects.create(
                day_of_week=day,
                is_open=True,
                start_time=time(9, 0),
                end_time=time(17, 0)
            )

    def test_create_business_hours(self):
        """Test creating business hours"""
        bh = BusinessHours.objects.get(day_of_week=0)
        self.assertEqual(bh.day_of_week, 0)
        self.assertTrue(bh.is_open)
        self.assertEqual(bh.start_time, time(9, 0))


class HolidayModelTest(TestCase):
    """Test the Holiday model"""

    def test_create_holiday(self):
        """Test creating a holiday"""
        holiday = Holiday.objects.create(
            date=date(2025, 12, 25),
            name="Christmas",
            description="Christmas Day"
        )
        self.assertEqual(holiday.name, "Christmas")
        self.assertEqual(holiday.date, date(2025, 12, 25))


class AppointmentAPITest(TestCase):
    """Test the Appointment API endpoints"""

    def setUp(self):
        self.client = Client()
        
        # Create service
        self.service = Service.objects.create(
            name="Contract Law",
            description="Contract law services"
        )

        # Create business hours for Monday-Friday
        for day in range(5):
            BusinessHours.objects.create(
                day_of_week=day,
                is_open=True,
                start_time=time(9, 0),
                end_time=time(17, 0)
            )

        # Create weekend closed hours
        for day in range(5, 7):
            BusinessHours.objects.create(
                day_of_week=day,
                is_open=False
            )

    def test_get_available_dates(self):
        """Test getting available dates"""
        response = self.client.get('/api/appointments/available_dates/')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.content)
        self.assertIn('available_dates', data)

    def test_get_available_slots(self):
        """Test getting available slots for a specific date"""
        future_date = (date.today() + timedelta(days=5)).strftime('%Y-%m-%d')
        response = self.client.get(f'/api/appointments/available_slots/?date={future_date}')
        self.assertEqual(response.status_code, 200)

    def test_book_appointment_success(self):
        """Test successfully booking an appointment"""
        future_date = (date.today() + timedelta(days=5)).strftime('%Y-%m-%d')
        
        data = {
            "client_name": "John Doe",
            "client_email": "john@example.com",
            "client_phone": "+1-555-0123",
            "appointment_date": future_date,
            "appointment_time": "10:00"
        }

        response = self.client.post(
            '/api/appointments/',
            json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 201)

    def test_book_appointment_past_date(self):
        """Test booking appointment in the past fails"""
        past_date = (date.today() - timedelta(days=5)).strftime('%Y-%m-%d')
        
        data = {
            "client_name": "John Doe",
            "client_email": "john@example.com",
            "client_phone": "+1-555-0123",
            "appointment_date": past_date,
            "appointment_time": "10:00"
        }

        response = self.client.post(
            '/api/appointments/',
            json.dumps(data),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 400)
