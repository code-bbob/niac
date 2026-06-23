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
                        .header {{ background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 36px; font-weight: bold; }}
                        .content {{ background: #ffffff; padding: 30px; border: 2px solid #c9a961; border-radius: 0 0 8px 8px; }}
                        .info-block {{ background: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #c9a961; }}
                        .info-label {{ color: #1e3a8a; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }}
                        .info-value {{ color: #333; margin-top: 8px; word-break: break-word; font-size: 18px; font-weight: 500; }}
                        .message-box {{ background: #f8f9fa; padding: 25px; margin: 25px 0; border: 2px solid #c9a961; border-radius: 6px; white-space: pre-wrap; word-wrap: break-word; font-size: 16px; line-height: 1.8; }}
                        .message-header {{ color: #1e3a8a; margin-top: 25px; font-size: 18px; font-weight: bold; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #c9a961; }}
                        .timestamp {{ color: #1e3a8a; font-size: 16px; font-weight: 500; }}
                    </style>
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Contact Form Submission</h1>
                        </div>
                        <div class="content">
                            <div class="info-block">
                                <div class="info-label">Name</div>
                                <div class="info-value">{name}</div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Email</div>
                                <div class="info-value"><a href="mailto:{email}" style="color: #1e3a8a; text-decoration: none;">{email}</a></div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Received</div>
                                <div class="info-value timestamp">{datetime.now().strftime('%B %d, %Y at %I:%M %p')}</div>
                            </div>

                            <h3 style="color: #1e3a8a; margin-top: 25px; font-size: 18px; font-weight: bold;">Message:</h3>
                            <div class="message-box">{message}</div>

                            <div class="footer">
                                <p>This message was submitted through the contact form on our website</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """

            send_brevo_email(
                settings.secretariatniac@gmail.com,
                admin_subject,
                admin_html_message,
            )

            # Confirmation email to user
            user_subject = "We Received Your Message - NIAC"
            user_html_message = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; font-size: 20px; }}
                        .container {{ max-width: 1000px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 40px; font-weight: bold; }}
                        .header p {{ margin: 15px 0 0 0; font-size: 20px; opacity: 0.95; }}
                        .content {{ background: #ffffff; padding: 40px; border: 2px solid #c9a961; border-radius: 0 0 8px 8px; }}
                        .message {{ color: #333; margin: 20px 0; font-size: 16px; line-height: 1.8; }}
                        .message p {{ font-size: 18px; margin: 15px 0; }}
                        .highlight {{ background: #f0f4ff; padding: 20px; border-left: 4px solid #c9a961; margin: 25px 0; border-radius: 4px; font-size: 16px; line-height: 1.8; }}
                        .highlight strong {{ font-size: 18px; color: #1e3a8a; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #c9a961; }}
                        .contact-info {{ background: #f8f9fa; padding: 25px; border-radius: 6px; margin: 20px 0; }}
                        .contact-item {{ margin: 15px 0; font-size: 16px; }}
                        .contact-label {{ color: #1e3a8a; font-weight: bold; font-size: 15px; }}
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
                                <p>Thank you for reaching out to <strong>NIAC</strong>. We have successfully received your message and appreciate you taking the time to contact us.</p>
                            </div>

                            <div class="highlight">
                                <strong>What happens next?</strong><br>
                                Our team will carefully review your message and respond to you within 24-48 business hours. We're committed to providing you with the professional guidance you need.
                            </div>

                            <div class="message">
                                <p>If you need to reach us sooner, feel free to contact us directly:</p>
                            </div>

                            <div class="contact-info">
                                <div class="contact-item">
                                    <span class="contact-label">Phone:</span> +977 01 5705609
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">Email:</span> <a href="mailto:niacadrweek@gmail.com" style="color: #1e3a8a; text-decoration: none;">niacadrweek@gmail.com</a>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">Email:</span> <a href="mailto:adrcenter@niac.asia" style="color: #1e3a8a; text-decoration: none;">adrcenter@niac.asia</a>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">Office:</span> House no. 163, Pragati Marg, Hanumansthan, Anamnagar, Kathmandu-29
                                </div>
                            </div>

                            <div class="message">
                                <p>Best regards,</p>
                                <p><strong>The NIAC Team</strong></p>
                                <p style="color: #1e3a8a; font-size: 14px;"><em>Nepal International ADR Center</em></p>
                            </div>

                            <div class="footer">
                                <p>NIAC — Nepal International ADR Center. All rights reserved.</p>
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
            client_subject = f"Appointment Confirmed - {appointment.appointment_date} at {appointment.appointment_time}"
            client_html_message = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; font-size: 16px; }}
                        .container {{ max-width: 800px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 36px; font-weight: bold; }}
                        .content {{ background: #ffffff; padding: 40px; border: 2px solid #c9a961; border-radius: 0 0 8px 8px; }}
                        .message {{ color: #333; margin: 20px 0; font-size: 16px; line-height: 1.8; }}
                        .message p {{ margin: 15px 0; }}
                        .appointment-details {{ background: #f8f9fa; padding: 30px; border: 2px solid #c9a961; border-radius: 6px; margin: 25px 0; }}
                        .detail-row {{ display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }}
                        .detail-row:last-child {{ border-bottom: none; }}
                        .detail-label {{ font-weight: bold; color: #1e3a8a; font-size: 14px; text-transform: uppercase; }}
                        .detail-value {{ color: #333; font-size: 16px; }}
                        .highlight {{ background: #f0f4ff; padding: 20px; border-left: 4px solid #c9a961; margin: 25px 0; border-radius: 4px; font-size: 15px; line-height: 1.8; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #c9a961; }}
                        .confirmation-badge {{ display: inline-block; background: #c9a961; color: white; padding: 10px 20px; border-radius: 4px; font-weight: bold; margin: 10px 0; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Appointment Confirmed!</h1>
                        </div>
                        <div class="content">
                            <div class="message">
                                <p>Dear {appointment.client_name},</p>
                                <p>Thank you for booking an appointment with <strong>NIAC</strong>. Your appointment has been successfully confirmed.</p>
                            </div>

                            <div class="confirmation-badge">APPOINTMENT CONFIRMED</div>

                            <div class="appointment-details">
                                <div class="detail-row">
                                    <span class="detail-label">Date: </span>
                                    <span class="detail-value">{appointment.appointment_date.strftime('%B %d, %Y')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Time: </span>
                                    <span class="detail-value">{appointment.appointment_time.strftime('%I:%M %p')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Duration: </span>
                                    <span class="detail-value">{appointment.duration_minutes} minutes</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Service: </span>
                                    <span class="detail-value">{appointment.service.name if appointment.service else 'General Inquiry'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Confirmation: # </span>
                                    <span class="detail-value">{str(appointment.id)[:8].upper()}</span>
                                </div>
                            </div>

                            <div class="highlight">
                                <strong>Important:</strong> Please save this email for your records. If you need to reschedule or cancel, please let us know at least 24 hours in advance.
                            </div>

                            <div class="message">
                                <p><strong>What to prepare:</strong></p>
                                <p>Please have any relevant documents ready and be prepared to discuss your matter in detail. This will help us provide you with the best possible guidance.</p>

                                <p><strong>Contact Information:</strong></p>
                                <p>Phone: +977 01 5705609<br>
                                Email: niacadrweek@gmail.com / adrcenter@niac.asia<br>
                                Office: House no. 163, Pragati Marg, Hanumansthan, Anamnagar, Kathmandu-29</p>
                            </div>

                            <div class="message">
                                <p>Best regards,</p>
                                <p><strong>The NIAC Team</strong></p>
                            </div>

                            <div class="footer">
                                <p>NIAC — Nepal International ADR Center. All rights reserved.</p>
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
                        .header {{ background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 36px; font-weight: bold; }}
                        .content {{ background: #ffffff; padding: 40px; border: 2px solid #c9a961; border-radius: 0 0 8px 8px; }}
                        .appointment-details {{ background: #f8f9fa; padding: 30px; border: 2px solid #c9a961; border-radius: 6px; margin: 25px 0; }}
                        .detail-row {{ display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }}
                        .detail-row:last-child {{ border-bottom: none; }}
                        .detail-label {{ font-weight: bold; color: #1e3a8a; font-size: 14px; text-transform: uppercase; }}
                        .detail-value {{ color: #333; font-size: 16px; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #c9a961; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Appointment Booking</h1>
                        </div>
                        <div class="content">
                            <div class="appointment-details">
                                <div class="detail-row">
                                    <span class="detail-label">Client Name: </span>
                                    <span class="detail-value">{appointment.client_name}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Email: </span>
                                    <span class="detail-value"><a href="mailto:{appointment.client_email}" style="color: #1e3a8a; text-decoration: none;">{appointment.client_email}</a></span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Phone: </span>
                                    <span class="detail-value">{appointment.client_phone}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Date: </span>
                                    <span class="detail-value">{appointment.appointment_date.strftime('%B %d, %Y')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Time: </span>
                                    <span class="detail-value">{appointment.appointment_time.strftime('%I:%M %p')}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Service: </span>
                                    <span class="detail-value">{appointment.service.name if appointment.service else 'General Inquiry'}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Duration: </span>
                                    <span class="detail-value">{appointment.duration_minutes} minutes</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Notes: </span>
                                    <span class="detail-value">{appointment.notes if appointment.notes else 'N/A'}</span>
                                </div>
                            </div>

                            <div class="footer">
                                <p>Confirmation: # {str(appointment.id)[:8].upper()}</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """

            send_brevo_email(
                settings.DEFAULT_FROM_EMAIL_ADDRESS,
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


def send_callback_email_async(name, phone, service):
    """Send callback request email asynchronously in a background thread"""
    def send_email():
        try:
            admin_subject = f"New Callback Request from {name}"
            admin_html_message = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; font-size: 20px; }}
                        .container {{ max-width: 1000px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 36px; font-weight: bold; }}
                        .content {{ background: #ffffff; padding: 30px; border: 2px solid #c9a961; border-radius: 0 0 8px 8px; }}
                        .info-block {{ background: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #c9a961; }}
                        .info-label {{ color: #1e3a8a; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }}
                        .info-value {{ color: #333; margin-top: 8px; word-break: break-word; font-size: 18px; font-weight: 500; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #c9a961; }}
                        .timestamp {{ color: #1e3a8a; font-size: 16px; font-weight: 500; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Callback Request</h1>
                        </div>
                        <div class="content">
                            <div class="info-block">
                                <div class="info-label">Name</div>
                                <div class="info-value">{name}</div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Phone</div>
                                <div class="info-value">{phone}</div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Service</div>
                                <div class="info-value">{service}</div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Received</div>
                                <div class="info-value timestamp">{datetime.now().strftime('%B %d, %Y at %I:%M %p')}</div>
                            </div>

                            <div class="footer">
                                <p>This request was submitted through the callback form on our website</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """

            send_brevo_email(
                settings.DEFAULT_FROM_EMAIL_ADDRESS,
                admin_subject,
                admin_html_message,
            )
        except Exception as e:
            print(f"Error sending callback email: {str(e)}")

    thread = threading.Thread(target=send_email, daemon=True)
    thread.start()


def send_event_booking_email_async(booking):
    """Send event booking email asynchronously in a background thread"""
    def send_email():
        try:
            event_title = booking.event.title
            event_date = booking.event.event_start_date.strftime('%B %d, %Y') if booking.event.event_start_date else 'TBD'

            # Email to admin
            admin_subject = f"New Event Registration - {booking.name} for {event_title}"
            admin_html_message = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; font-size: 20px; }}
                        .container {{ max-width: 1000px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 36px; font-weight: bold; }}
                        .content {{ background: #ffffff; padding: 30px; border: 2px solid #c9a961; border-radius: 0 0 8px 8px; }}
                        .info-block {{ background: #f8f9fa; padding: 20px; margin: 20px 0; border-left: 4px solid #c9a961; }}
                        .info-label {{ color: #1e3a8a; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }}
                        .info-value {{ color: #333; margin-top: 8px; word-break: break-word; font-size: 18px; font-weight: 500; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #c9a961; }}
                        .timestamp {{ color: #1e3a8a; font-size: 16px; font-weight: 500; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Event Registration</h1>
                        </div>
                        <div class="content">
                            <div class="info-block">
                                <div class="info-label">Event</div>
                                <div class="info-value">{event_title}</div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Event Date</div>
                                <div class="info-value">{event_date}</div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Name</div>
                                <div class="info-value">{booking.name}</div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Email</div>
                                <div class="info-value"><a href="mailto:{booking.email}" style="color: #1e3a8a; text-decoration: none;">{booking.email}</a></div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Phone</div>
                                <div class="info-value">{booking.phone}</div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Spaces</div>
                                <div class="info-value">{booking.spaces}</div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Company</div>
                                <div class="info-value">{booking.company if booking.company else 'N/A'}</div>
                            </div>

                            <div class="info-block">
                                <div class="info-label">Received</div>
                                <div class="info-value timestamp">{datetime.now().strftime('%B %d, %Y at %I:%M %p')}</div>
                            </div>

                            <div class="footer">
                                <p>This registration was submitted through the event page on our website</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """

            send_brevo_email(
                settings.DEFAULT_FROM_EMAIL_ADDRESS,
                admin_subject,
                admin_html_message,
            )

            # Confirmation email to user
            user_subject = f"Registration Confirmed - {event_title} - NIAC"
            user_html_message = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; font-size: 20px; }}
                        .container {{ max-width: 1000px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 0; font-size: 40px; font-weight: bold; }}
                        .header p {{ margin: 15px 0 0 0; font-size: 20px; opacity: 0.95; }}
                        .content {{ background: #ffffff; padding: 40px; border: 2px solid #c9a961; border-radius: 0 0 8px 8px; }}
                        .message {{ color: #333; margin: 20px 0; font-size: 16px; line-height: 1.8; }}
                        .message p {{ font-size: 18px; margin: 15px 0; }}
                        .highlight {{ background: #f0f4ff; padding: 20px; border-left: 4px solid #c9a961; margin: 25px 0; border-radius: 4px; font-size: 16px; line-height: 1.8; }}
                        .highlight strong {{ font-size: 18px; color: #1e3a8a; }}
                        .footer {{ text-align: center; color: #666; font-size: 14px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #c9a961; }}
                        .contact-info {{ background: #f8f9fa; padding: 25px; border-radius: 6px; margin: 20px 0; }}
                        .contact-item {{ margin: 15px 0; font-size: 16px; }}
                        .contact-label {{ color: #1e3a8a; font-weight: bold; font-size: 15px; }}
                        .event-details {{ background: #f8f9fa; padding: 25px; border: 2px solid #c9a961; border-radius: 6px; margin: 25px 0; }}
                        .detail-row {{ padding: 8px 0; }}
                        .detail-label {{ color: #1e3a8a; font-weight: bold; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Registration Confirmed!</h1>
                            <p>You're registered for {event_title}</p>
                        </div>
                        <div class="content">
                            <div class="message">
                                <p>Dear {booking.name},</p>
                                <p>Thank you for registering for <strong>{event_title}</strong> with <strong>NIAC</strong>. Your registration has been received successfully.</p>
                            </div>

                            <div class="event-details">
                                <div class="detail-row">
                                    <span class="detail-label">Event:</span> {event_title}
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Date:</span> {event_date}
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Spaces Booked:</span> {booking.spaces}
                                </div>
                            </div>

                            <div class="highlight">
                                <strong>What happens next?</strong><br>
                                We will send you further details about the event including venue information and any materials you may need. If you have any questions, please don't hesitate to contact us.
                            </div>

                            <div class="message">
                                <p>If you need to reach us, feel free to contact us directly:</p>
                            </div>

                            <div class="contact-info">
                                <div class="contact-item">
                                    <span class="contact-label">Phone:</span> +977 01 5705609
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">Email:</span> <a href="mailto:niacadrweek@gmail.com" style="color: #1e3a8a; text-decoration: none;">niacadrweek@gmail.com</a>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">Email:</span> <a href="mailto:adrcenter@niac.asia" style="color: #1e3a8a; text-decoration: none;">adrcenter@niac.asia</a>
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label">Office:</span> House no. 163, Pragati Marg, Hanumansthan, Anamnagar, Kathmandu-29
                                </div>
                            </div>

                            <div class="message">
                                <p>Best regards,</p>
                                <p><strong>The NIAC Team</strong></p>
                                <p style="color: #1e3a8a; font-size: 14px;"><em>Nepal International ADR Center</em></p>
                            </div>

                            <div class="footer">
                                <p>NIAC — Nepal International ADR Center. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
            """

            send_brevo_email(
                booking.email,
                user_subject,
                user_html_message,
            )
        except Exception as e:
            print(f"Error sending event booking email: {str(e)}")

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
