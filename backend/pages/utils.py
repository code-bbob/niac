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
                "secretariatniac@gmail.com",
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


def send_proof_received_email_async(booking):
    """Send proof-of-payment confirmation email"""
    def send_email():
        try:
            event_title = booking.event.title
            registration_id = booking.registration_id
            subject = f"Payment Proof Received - {registration_id} - {event_title} - NIAC"
            html = f"""
            <html><head><style>
                body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }}
                .header h1 {{ margin: 0; font-size: 28px; }}
                .content {{ background: #fff; padding: 30px; border: 2px solid #c9a961; border-radius: 0 0 8px 8px; }}
            </style></head><body>
            <div class="container">
                <div class="header"><h1>Proof Received</h1></div>
                <div class="content">
                    <p>Dear {booking.name},</p>
                    <p>We have received your proof of payment for <strong>{event_title}</strong>.</p>
                    <p><strong>Registration ID:</strong> {registration_id}</p>
                    <p>Your registration status has been updated to <strong>"Pending Verification"</strong>.</p>
                    <p>Our team will verify your payment against our bank records and confirm your registration within 2–3 business days.</p>
                    <p>If you have any questions, please contact us at <a href="mailto:secretariatniac@gmail.com">secretariatniac@gmail.com</a>.</p>
                    <p>Best regards,<br><strong>The NIAC Team</strong></p>
                </div>
            </div>
            </body></html>
            """
            send_brevo_email(booking.email, subject, html)
        except Exception as e:
            print(f"Error sending proof email: {str(e)}")
    thread = threading.Thread(target=send_email, daemon=True)
    thread.start()


def send_event_booking_email_async(booking):
    """Send event booking email asynchronously in a background thread"""
    def send_email():
        try:
            event_title = booking.event.title
            event_date = booking.event.event_start_date.strftime('%B %d, %Y') if booking.event.event_start_date else 'TBD'
            registration_id = booking.registration_id
            bank = booking.event
            lookup_url = f"{settings.FRONTEND_URL}/events/{booking.event.slug}/register?token={booking.lookup_token}"

            # Email to admin
            admin_subject = f"New Reg #{registration_id} - {booking.name} for {event_title}"
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
                                <div class="info-label">Registration ID</div>
                                <div class="info-value" style="font-size:24px;">{registration_id}</div>
                            </div>

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
            user_subject = f"Registration #{registration_id} - {event_title} - NIAC"
            user_html_message = f"""
            <html>
                <head>
                    <style>
                        body {{ font-family: 'Noto Sans', Arial, sans-serif; color: #333; line-height: 1.8; font-size: 20px; }}
                        .container {{ max-width: 640px; margin: 0 auto; padding: 20px; }}
                        .header {{ background: linear-gradient(135deg, #0a1628 0%, #1e3a8a 100%); color: white; padding: 40px; border-radius: 8px 8px 0 0; text-align: center; }}
                        .header h1 {{ margin: 20px 0 0 0; font-size: 32px; font-weight: bold; }}
                        .header p {{ margin: 12px 0 0 0; font-size: 18px; opacity: 0.95; }}
                        .content {{ background: #ffffff; padding: 32px; border: 2px solid #c9a961; border-radius: 0 0 8px 8px; }}
                        .reg-badge {{ display: inline-block; background: #c9a961; color: white; padding: 12px 28px; border-radius: 6px; font-size: 22px; font-weight: bold; letter-spacing: 2px; margin: 10px 0; }}
                        .footer {{ text-align: center; color: #666; font-size: 13px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #c9a961; }}
                        .contact-info {{ background: #f8f9fa; padding: 25px; border-radius: 6px; margin: 20px 0; }}
                        .contact-item {{ margin: 12px 0; font-size: 15px; }}
                        .contact-label {{ color: #1e3a8a; font-weight: bold; font-size: 14px; }}
                        .event-details {{ background: #f8f9fa; padding: 25px; border: 2px solid #c9a961; border-radius: 6px; margin: 25px 0; }}
                        .detail-row {{ padding: 6px 0; }}
                        .detail-label {{ color: #1e3a8a; font-weight: bold; }}
                        .bank-details {{ background: #fff8e7; padding: 20px; border: 1px solid #c9a961; border-radius: 6px; margin: 15px 0; }}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Registration Received!</h1>
                            <p>You're registered for {event_title}</p>
                        </div>
                        <div class="content">
                            <div style="text-align:center;margin:20px 0;">
                                <div class="reg-badge">{registration_id}</div>
                                <p style="font-size:14px;color:#666;margin-top:4px;">Your unique Registration ID</p>
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
                                <div class="detail-row">
                                    <span class="detail-label">Registration ID:</span> {registration_id}
                                </div>
                            </div>

                            <div style="background:#f0f4ff;padding:25px;border-radius:8px;margin:25px 0;">
                                <h3 style="color:#1e3a8a;margin:0 0 15px 0;font-size:18px;text-align:center;">How to Complete Your Payment – Step by Step</h3>

                                <table cellpadding="0" cellspacing="0" style="width:100%;margin:10px 0;background:#f8f9fa;border-radius:6px;">
                                    <tr>
                                        <td style="width:36px;padding:12px 0 12px 12px;vertical-align:top;">
                                            <table cellpadding="0" cellspacing="0" style="width:28px;height:28px;">
                                                <tr>
                                                    <td style="width:28px;height:28px;background:#1e3a8a;color:#ffffff;border-radius:50%;text-align:center;vertical-align:middle;font-size:14px;font-weight:bold;line-height:28px;">
                                                        1
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="padding:12px 12px 12px 8px;vertical-align:top;font-size:14px;color:#444;line-height:1.6;">
                                            <strong>Send Wire Transfer</strong><br>
                                            Instruct your bank to wire the ticket amount to our Sanima Bank account (details below).<br>
                                            <strong>Important:</strong> Put <strong>{registration_id}</strong> in the wire transfer memo/remarks field.
                                        </td>
                                    </tr>
                                </table>

                                <table cellpadding="0" cellspacing="0" style="width:100%;margin:10px 0;background:#f8f9fa;border-radius:6px;">
                                    <tr>
                                        <td style="width:36px;padding:12px 0 12px 12px;vertical-align:top;">
                                            <table cellpadding="0" cellspacing="0" style="width:28px;height:28px;">
                                                <tr>
                                                    <td style="width:28px;height:28px;background:#1e3a8a;color:#ffffff;border-radius:50%;text-align:center;vertical-align:middle;font-size:14px;font-weight:bold;line-height:28px;">
                                                        2
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="padding:12px 12px 12px 8px;vertical-align:top;font-size:14px;color:#444;line-height:1.6;">
                                            <strong>Upload Your Receipt</strong><br>
                                            <a href="{lookup_url}" style="color:#1e3a8a;font-weight:bold;text-decoration:underline;">Click here</a> to return to your booking page and upload your wire transfer receipt / MT103. Your status will change to "Pending Verification".
                                        </td>
                                    </tr>
                                </table>

                                <table cellpadding="0" cellspacing="0" style="width:100%;margin:10px 0;background:#f8f9fa;border-radius:6px;">
                                    <tr>
                                        <td style="width:36px;padding:12px 0 12px 12px;vertical-align:top;">
                                            <table cellpadding="0" cellspacing="0" style="width:28px;height:28px;">
                                                <tr>
                                                    <td style="width:28px;height:28px;background:#1e3a8a;color:#ffffff;border-radius:50%;text-align:center;vertical-align:middle;font-size:14px;font-weight:bold;line-height:28px;">
                                                        3
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td style="padding:12px 12px 12px 8px;vertical-align:top;font-size:14px;color:#444;line-height:1.6;">
                                            <strong>We Verify & Confirm</strong><br>
                                            Our team matches your transfer against our bank statement and flips your status to "Confirmed". You'll receive a confirmation email.
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <div class="bank-details">
                                <h4 style="color:#1e3a8a;margin:0 0 12px 0;">Sanima Bank Wire Details</h4>
                                <p style="margin:4px 0;font-size:14px;"><strong>Bank:</strong> {bank.bank_name or 'Sanima Bank Ltd.'}</p>
                                <p style="margin:4px 0;font-size:14px;"><strong>Account Name:</strong> {bank.bank_account_name or 'Nepal International A.D.R. Center'}</p>
                                <p style="margin:4px 0;font-size:14px;"><strong>Account Number:</strong> {bank.bank_number or 'N/A'}</p>
                                <p style="margin:4px 0;font-size:14px;"><strong>Account Type:</strong> {bank.bank_account_type or 'Savings Account'}</p>
                                <p style="margin:4px 0;font-size:14px;"><strong>SWIFT Code:</strong> {bank.swift_code or 'N/A'}</p>
                                <p style="margin:4px 0;font-size:14px;"><strong>Bank Address:</strong> {bank.bank_address or 'Kathmandu, Nepal'}</p>
                                <p style="margin-top:12px;padding-top:12px;border-top:1px solid #c9a961;font-size:13px;color:#c0392b;">
                                    <strong>⚠ MEMO REQUIRED:</strong> You MUST include <strong>{registration_id}</strong> in the wire transfer memo/remarks. Otherwise we cannot match your payment.
                                </p>
                            </div>

                            <div style="margin:25px 0 15px 0;text-align:center;">
                                <a href="{lookup_url}" style="display:inline-block;background:#c9a961;color:#ffffff;padding:14px 36px;border-radius:6px;font-size:16px;font-weight:bold;text-decoration:none;">Upload Your Payment Receipt</a>
                            </div>

                            <p style="font-size:14px;color:#555;margin:20px 0;text-align:center;">
                                If you need to reach us, feel free to contact us directly:
                            </p>

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

                            <div style="text-align:center;margin:30px 0 10px 0;">
                                <p style="font-size:16px;color:#333;margin:0 0 4px 0;">Best regards,</p>
                                <p style="font-size:16px;font-weight:bold;color:#1e3a8a;margin:0 0 2px 0;">The NIAC Team</p>
                                <p style="font-size:14px;font-style:italic;color:#1e3a8a;margin:0;">Nepal International ADR Center</p>
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
