import threading
import requests
from django.conf import settings
from datetime import datetime, timedelta


def send_brevo_email(to_email, subject, html_content):
    """Send email using Brevo API v3 instead of SMTP"""
    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": settings.BREVO_API_KEY,
        "content-type": "application/json"
    }

    payload = {
        "sender": {"email": settings.DEFAULT_FROM_EMAIL_ADDRESS, "name": settings.DEFAULT_FROM_EMAIL_NAME},
        "to": [{"email": to_email}],
        "subject": subject,
        "htmlContent": html_content
    }

    response = requests.post(url, json=payload, headers=headers)
    return response.status_code, response.text


def send_contact_email_async(name, email, message):
    """Send contact form email asynchronously in a background thread"""
    def send_email():
        try:
            # Email to admin
            admin_subject = f"New Contact Message from {name}"
            admin_html_message = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; font-size: 20px; }}
                        .container {{ max-width: 1000px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #B45309 0%, #92400E 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 36px; font-weight: bold; }}
                        .content {{ background: #FFFBEB; padding: 30px; border: 2px solid #FCD34D; border-radius: 0 0 8px 8px; }}
                        .info-block {{ background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #B45309; }}
                        .info-label {{ color: #92400E; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }}
                        .info-value {{ color: #333; margin-top: 8px; word-break: break-word; font-size: 18px; font-weight: 500; }}
                        .message-box {{ background: white; padding: 25px; margin: 25px 0; border: 2px solid #FCD34D; border-radius: 6px; white-space: pre-wrap; word-wrap: break-word; font-size: 16px; line-height: 1.8; }}
                        .message-header {{ color: #92400E; margin-top: 25px; font-size: 18px; font-weight: bold; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #E5A954; }}
                        .timestamp {{ color: #92400E; font-size: 16px; font-weight: 500; }}
                    </style>
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>📬 New Contact Form Submission</h1>
                        </div>
                        <div class="content">
                            <div class="info-block">
                                <div class="info-label">👤 Name</div>
                                <div class="info-value">{name}</div>
                            </div>
                            
                            <div class="info-block">
                                <div class="info-label">📧 Email</div>
                                <div class="info-value"><a href="mailto:{email}" style="color: #B45309; text-decoration: none;">{email}</a></div>
                            </div>
                            
                            <div class="info-block">
                                <div class="info-label">⏰ Received</div>
                                <div class="info-value timestamp">{datetime.now().strftime('%B %d, %Y at %I:%M %p')}</div>
                            </div>
                            
                            <h3 style="color: #92400E; margin-top: 25px; font-size: 18px; font-weight: bold;">Message:</h3>
                            <div class="message-box">{message}</div>
                            
                            <div class="footer">
                                <p>This message was submitted through the contact form on equitylawandco.com</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            send_brevo_email(
                'equitylawandco@gmail.com',
                admin_subject,
                admin_html_message,
            )
            
            # Confirmation email to user
            user_subject = "✓ We Received Your Message - Equity Law & Co"
            user_html_message = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; font-size: 20px; }}
                        .container {{ max-width: 1000px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #B45309 0%, #92400E 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 40px; font-weight: bold; }}
                        .header p {{ margin: 15px 0 0 0; font-size: 20px; opacity: 0.95; }}
                        .content {{ background: #FFFBEB; padding: 40px; border: 2px solid #FCD34D; border-radius: 0 0 8px 8px; }}
                        .message {{ color: #333; margin: 20px 0; font-size: 16px; line-height: 1.8; }}
                        .message p {{ font-size: 18px; margin: 15px 0; }}
                        .highlight {{ background: #FEF3C7; padding: 20px; border-left: 4px solid #F59E0B; margin: 25px 0; border-radius: 4px; font-size: 16px; line-height: 1.8; }}
                        .highlight strong {{ font-size: 18px; color: #92400E; }}
                        .button {{ display: inline-block; background: #B45309; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; font-size: 16px; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5A954; }}
                        .contact-info {{ background: white; padding: 25px; border-radius: 6px; margin: 20px 0; }}
                        .contact-item {{ margin: 15px 0; font-size: 16px; }}
                        .contact-label {{ color: #92400E; font-weight: bold; font-size: 15px; }}
                    </style>
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Thank You!</h1>
                            <p>We've received your message</p>
                        </div>
                        <div class="content">
                            <div class="message">
                                <p>Dear {name},</p>
                                <p>Thank you for reaching out to <strong>Equity Law & Co</strong>. We have successfully received your message and appreciate you taking the time to contact us.</p>
                            </div>
                            
                            <div class="highlight">
                                <strong>What happens next?</strong><br>
                                Our legal team will carefully review your message and respond to you within 24-48 business hours. We're committed to providing you with the professional legal guidance you need.
                            </div>
                            
                            <div class="message">
                                <p>If you need to reach us sooner, feel free to contact us directly:</p>
                            </div>
                            
                            <div class="contact-info">
                                <div class="contact-item">
                                    <span class="contact-label">📞 Phone:</span> (977) 9841052926
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">📧 Email:</span> <a href="mailto:contact@equitylawandco.com" style="color: #B45309; text-decoration: none;">contact@equitylawandco.com</a>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">📍 Office:</span> Thapagaun, Kathmandu, Nepal
                                </div>
                            </div>
                            
                            <div class="message">
                                <p>Best regards,</p>
                                <p><strong>The Equity Law & Co Team</strong></p>
                                <p style="color: #92400E; font-size: 14px;"><em>Leading the Legal Industry with Excellence and Integrity</em></p>
                            </div>
                            
                            <div class="footer">
                                <p>© 2025 Equity Law & Co. All rights reserved.<br>
                                <a href="https://equitylawandco.com" style="color: #B45309; text-decoration: none;">Visit our website</a> | 
                                <a href="mailto:contact@equitylawandco.com" style="color: #B45309; text-decoration: none;">Contact us</a></p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            send_brevo_email(
                email,
                user_subject,
                user_html_message,
            )
        except Exception as e:
            print(f"Error sending email: {str(e)}")
    
    # Start email sending in a background thread
    thread = threading.Thread(target=send_email, daemon=True)
    thread.start()


def send_appointment_confirmation_email(appointment):
    """Send appointment confirmation email to the client"""
    def send_email():
        try:
            # Confirmation email to client
            client_subject = f"✓ Appointment Confirmed - {appointment.appointment_date} at {appointment.appointment_time}"
            client_html_message = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; font-size: 16px; }}
                        .container {{ max-width: 800px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #B45309 0%, #92400E 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 36px; font-weight: bold; }}
                        .content {{ background: #FFFBEB; padding: 40px; border: 2px solid #FCD34D; border-radius: 0 0 8px 8px; }}
                        .message {{ color: #333; margin: 20px 0; font-size: 16px; line-height: 1.8; }}
                        .message p {{ margin: 15px 0; }}
                        .appointment-details {{ background: white; padding: 30px; border: 2px solid #FCD34D; border-radius: 6px; margin: 25px 0; }}
                        .detail-row {{ display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #E5E7EB; }}
                        .detail-row:last-child {{ border-bottom: none; }}
                        .detail-label {{ font-weight: bold; color: #92400E; font-size: 14px; text-transform: uppercase; }}
                        .detail-value {{ color: #333; font-size: 16px; }}
                        .highlight {{ background: #FEF3C7; padding: 20px; border-left: 4px solid #F59E0B; margin: 25px 0; border-radius: 4px; font-size: 15px; line-height: 1.8; }}
                        .button {{ display: inline-block; background: #B45309; color: white; padding: 15px 40px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; font-size: 16px; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5A954; }}
                        .confirmation-badge {{ display: inline-block; background: #10B981; color: white; padding: 10px 20px; border-radius: 4px; font-weight: bold; margin: 10px 0; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>✓ Appointment Confirmed!</h1>
                        </div>
                        <div class="content">
                            <div class="message">
                                <p>Dear {appointment.client_name},</p>
                                <p>Thank you for booking an appointment with <strong>Equity Law & Co</strong>. Your appointment has been successfully confirmed.</p>
                            </div>
                            
                            <div class="confirmation-badge">APPOINTMENT CONFIRMED</div>
                            
                            <div class="appointment-details">
                                <div class="detail-row">
                                    <span class="detail-label">📅 Date: </span>
                                    <span class="detail-value">{appointment.appointment_date.strftime('%B %d, %Y')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">🕐 Time: </span>
                                    <span class="detail-value">{appointment.appointment_time.strftime('%I:%M %p')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">⏱️ Duration: </span>
                                    <span class="detail-value">{appointment.duration_minutes} minutes</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">📋 service: </span>
                                    <span class="detail-value">{appointment.service.name if appointment.service else 'General Inquiry'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">🔖 Confirmation: # </span>
                                    <span class="detail-value">{str(appointment.id)[:8].upper()}</span>
                                </div>
                            </div>
                            
                            <div class="highlight">
                                <strong>Important:</strong> Please save this email for your records. If you need to reschedule or cancel, please let us know at least 24 hours in advance.
                            </div>
                            
                            <div class="message">
                                <p><strong>What to prepare:</strong></p>
                                <p>Please have any relevant documents ready and be prepared to discuss your legal matter in detail. This will help us provide you with the best possible guidance.</p>
                                
                                <p><strong>Contact Information:</strong></p>
                                <p>📞 Phone: (977) 9841052926<br>
                                📧 Email: contact@equitylawandco.com<br>
                                📍 Office: Thapagaun, Kathmandu, Nepal</p>
                            </div>
                            
                            <div class="message">
                                <p>Best regards,</p>
                                <p><strong>The Equity Law & Co Team</strong></p>
                            </div>
                            
                            <div class="footer">
                                <p>© 2025 Equity Law & Co. All rights reserved.<br>
                                <a href="https://equitylawandco.com" style="color: #B45309; text-decoration: none;">Visit our website</a></p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            send_brevo_email(
                appointment.client_email,
                client_subject,
                client_html_message,
            )
            
            # Email to admin
            admin_subject = f"New Appointment Booking - {appointment.client_name} ({appointment.appointment_date})"
            admin_html_message = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; font-size: 16px; }}
                        .container {{ max-width: 800px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #B45309 0%, #92400E 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 36px; font-weight: bold; }}
                        .content {{ background: #FFFBEB; padding: 40px; border: 2px solid #FCD34D; border-radius: 0 0 8px 8px; }}
                        .appointment-details {{ background: white; padding: 30px; border: 2px solid #FCD34D; border-radius: 6px; margin: 25px 0; }}
                        .detail-row {{ display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #E5E7EB; }}
                        .detail-row:last-child {{ border-bottom: none; }}
                        .detail-label {{ font-weight: bold; color: #92400E; font-size: 14px; text-transform: uppercase; }}
                        .detail-value {{ color: #333; font-size: 16px; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5A954; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>📅 New Appointment Booking</h1>
                        </div>
                        <div class="content">
                            <div class="appointment-details">
                                <div class="detail-row">
                                    <span class="detail-label">👤 Client Name: </span>
                                    <span class="detail-value">{appointment.client_name}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">📧 Email: </span>
                                    <span class="detail-value"><a href="mailto:{appointment.client_email}" style="color: #B45309; text-decoration: none;">{appointment.client_email}</a></span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">📞 Phone: </span>
                                    <span class="detail-value">{appointment.client_phone}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">📅 Date: </span>
                                    <span class="detail-value">{appointment.appointment_date.strftime('%B %d, %Y')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">🕐 Time: </span>
                                    <span class="detail-value">{appointment.appointment_time.strftime('%I:%M %p')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">📋 service: </span>
                                    <span class="detail-value">{appointment.service.name if appointment.service else 'General Inquiry'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">⏱️ Duration: </span>
                                    <span class="detail-value">{appointment.duration_minutes} minutes</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">📝 Notes: </span>
                                    <span class="detail-value">{appointment.notes if appointment.notes else 'N/A'}</span>
                                </div>
                            </div>
                            
                            <div class="footer">
                                <p>🔖 Confirmation: # {str(appointment.id)[:8].upper()}</p> 
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            send_brevo_email(
                'equitylawandco@gmail.com',
                admin_subject,
                admin_html_message,
            )
            
            # Mark as confirmation sent
            appointment.confirmation_sent = True
            appointment.save(update_fields=['confirmation_sent'])
            
        except Exception as e:
            print(f"Error sending appointment confirmation email: {str(e)}")
    
    # Start email sending in a background thread
    thread = threading.Thread(target=send_email, daemon=True)
    thread.start()


def get_available_time_slots(date, duration_minutes=60):
    """
    Get available time slots for a given date based on defined available hours windows
    Returns a list of available appointment times
    Only generates slots within the configured available hours windows for that day
    Checks for overlaps with existing appointments
    """
    from datetime import datetime, time
    from .models import Appointment, AppointmentDay, AvailableHours
    
    # Check if date is in the past
    if date < datetime.now().date():
        return []
    
    # Get appointment day configuration for this day
    day_of_week = date.weekday()
    try:
        appointment_day = AppointmentDay.objects.get(day_of_week=day_of_week)
    except AppointmentDay.DoesNotExist:
        return []
    
    if not appointment_day.is_active:
        return []
    
    # Get available hour windows for this day
    available_windows = appointment_day.available_hours.all().order_by('start_time')
    
    if not available_windows.exists():
        return []
    
    # Generate time slots within available windows
    available_slots = []
    
    for window in available_windows:
        current_time = window.start_time
        window_end = window.end_time
        
        while current_time < window_end:
            # Calculate the end time for this potential appointment
            slot_end = (datetime.combine(date, current_time) + timedelta(minutes=duration_minutes)).time()
            
            # Check if slot fits within the window
            if slot_end <= window_end:
                # Check for overlaps with existing appointments
                slot_start_dt = datetime.combine(date, current_time)
                slot_end_dt = datetime.combine(date, slot_end)
                
                # Get all existing appointments for this date
                existing_appointments = Appointment.objects.filter(
                    appointment_date=date,
                    status__in=['pending', 'confirmed']
                )
                
                # Check if this slot overlaps with any existing appointment
                has_overlap = False
                for appt in existing_appointments:
                    appt_start_dt = datetime.combine(date, appt.appointment_time)
                    appt_end_dt = appt_start_dt + timedelta(minutes=appt.duration_minutes)
                    
                    # Check for overlap: slot starts before appt ends AND slot ends after appt starts
                    if slot_start_dt < appt_end_dt and slot_end_dt > appt_start_dt:
                        has_overlap = True
                        break
                
                if not has_overlap:
                    available_slots.append(current_time)
            
            # Move to next slot (30-minute intervals)
            current_time = (datetime.combine(date, current_time) + timedelta(minutes=30)).time()
    
    return available_slots
