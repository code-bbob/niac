import { useState, useEffect } from 'react';

export default function AppointmentForm() {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [Services, setServices] = useState([]);

  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    service: '',
    appointment_date: '',
    appointment_time: '',
    duration_minutes: 60,
    notes: ''
  });

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

  // Load service and available dates on mount
  useEffect(() => {
    loadServices();
    loadAvailableDates();
  }, []);

  const loadServices = async () => {
    try {
      const response = await fetch(`${API_BASE}/services/`);
      const data = await response.json();
      setServices(data.results || data);
    } catch (err) {
      console.error('Error loading service:', err);
    }
  };

  const loadAvailableDates = async (duration = 60) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `${API_BASE}/appointments/available_dates/?days_ahead=30&duration_minutes=${duration}`
      );
      
      if (!response.ok) throw new Error('Failed to load available dates');
      
      const data = await response.json();
      setAvailableDates(data.available_dates || []);
    } catch (err) {
      setError('Unable to load available dates. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableSlots = async (date, duration = formData.duration_minutes) => {
    setLoading(true);
    setError('');
    setAvailableSlots([]);
    
    try {
      const response = await fetch(
        `${API_BASE}/appointments/available_slots/?date=${date}&duration_minutes=${duration}`
      );
      
      if (!response.ok) throw new Error('Failed to load time slots');
      
      const data = await response.json();
      setAvailableSlots(data.available_slots || []);
      
      if (data.available_slots.length === 0) {
        setError(`No available time slots for this date with the selected ${duration}-minute duration.`);
      }
    } catch (err) {
      setError('Unable to load time slots. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, appointment_date: date, appointment_time: '' });
    if (date) {
      loadAvailableSlots(date, formData.duration_minutes);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    
    // If duration is changed and a date is selected, reload slots with new duration
    if (name === 'duration_minutes' && formData.appointment_date) {
      const newDuration = parseInt(value);
      setFormData({ ...updatedData, appointment_time: '' });
      loadAvailableSlots(formData.appointment_date, newDuration);
    } else if (name === 'duration_minutes') {
      // Duration changed but no date selected, reload dates for new duration
      const newDuration = parseInt(value);
      setFormData(updatedData);
      loadAvailableDates(newDuration);
    } else {
      setFormData(updatedData);
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes === 60) return '1 hour';
    if (minutes === 90) return '1.5 hours';
    return `${Math.floor(minutes / 60)} hours`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation
    if (!formData.client_name.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (!formData.client_email.trim()) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    if (!formData.client_phone.trim()) {
      setError('Please enter your phone number');
      setLoading(false);
      return;
    }

    if (!formData.appointment_date) {
      setError('Please select a date');
      setLoading(false);
      return;
    }

    if (!formData.appointment_time) {
      setError('Please select a time');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        client_name: formData.client_name.trim(),
        client_email: formData.client_email.trim(),
        client_phone: formData.client_phone.trim(),
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        duration_minutes: formData.duration_minutes,
        notes: formData.notes.trim(),
      };

      if (formData.service) {
        payload.service = formData.service;
      }

      const response = await fetch(`${API_BASE}/appointments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to book appointment');
      }

      setSuccess('✓ Appointment booked successfully! Check your email for confirmation.');
      
      // Reset form
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: '',
        service: '',
        appointment_date: '',
        appointment_time: '',
        duration_minutes: 60,
        notes: ''
      });
      
      setAvailableSlots([]);
      
      // Reload dates
      setTimeout(() => loadAvailableDates(), 1000);

    } catch (err) {
      setError(err.message || 'Failed to book appointment. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-amber-50">
      {/* Hero Section - Compact */}
      <section className="bg-amber-50 relative overflow-hidden py-12 md:py-16">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -mr-48 -mt-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-semibold text-amber-700 tracking-widest uppercase">Schedule Your Consultation</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3 mb-4">
            Book an Appointment
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Connect with our legal team to discuss your case and explore how we can help.
          </p>
        </div>
      </section>

      {/* Form Section - Compact */}
      <section className="pb-12 mx-auto">
        <div className="max-w-4xl mx-auto bg-white py-12 px-4 sm:px-6 lg:px-8">
          {/* Alert Messages */}
          {error && (
            <div className="mb-8 p-6 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-800 animate-in fade-in slide-in-from-top">
              <div className="flex">
                <div className="flex-shrink-0 text-red-700 text-xl">⚠️</div>
                <div className="ml-4 text-sm font-medium">{error}</div>
              </div>
            </div>
          )}
          {success && (
            <div className="mb-8 p-6 rounded-lg bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 animate-in fade-in slide-in-from-top">
              <div className="flex">
                <div className="flex-shrink-0 text-emerald-700 text-xl">✓</div>
                <div className="ml-4 text-sm font-medium">{success}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-serif font-bold text-slate-900 mb-2">Your Information</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-amber-700 to-amber-500 rounded"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="client_name" className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Full Name *</label>
                  <input
                    id="client_name"
                    type="text"
                    name="client_name"
                    value={formData.client_name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-inherit transition-all bg-slate-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-600/30 placeholder:text-slate-400"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="client_email" className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Email Address *</label>
                  <input
                    id="client_email"
                    type="email"
                    name="client_email"
                    value={formData.client_email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-inherit transition-all bg-slate-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-600/30 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col">
                <label htmlFor="client_phone" className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Phone Number *</label>
                <input
                  id="client_phone"
                  type="tel"
                  name="client_phone"
                  value={formData.client_phone}
                  onChange={handleInputChange}
                  placeholder="+977 123-4567"
                  required
                  className="px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-inherit transition-all bg-slate-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-600/30 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Appointment Details Section */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-serif font-bold text-slate-900 mb-2">Appointment Details</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-amber-700 to-amber-500 rounded"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="service" className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">service (Optional)</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-inherit transition-all bg-slate-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-600/30"
                  >
                    <option value="">Select a service</option>
                    {Services.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="duration_minutes" className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Session Duration</label>
                  <select
                    id="duration_minutes"
                    name="duration_minutes"
                    value={formData.duration_minutes}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-inherit transition-all bg-slate-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-600/30"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>1 hour</option>
                    <option value={90}>1.5 hours</option>
                    <option value={120}>2 hours</option>
                  </select>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Date Selection */}
                <div className="flex flex-col">
                  <label htmlFor="appointment_date" className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Preferred Date *</label>
                  {loading && !availableDates.length ? (
                    <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm font-medium animate-pulse">Loading available dates...</div>
                  ) : (
                    <select
                      id="appointment_date"
                      name="appointment_date"
                      value={formData.appointment_date}
                      onChange={(e) => handleDateChange(e.target.value)}
                      required
                      className="px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-inherit transition-all bg-slate-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-600/30"
                    >
                      <option value="">Select a date</option>
                      {availableDates.map((date) => (
                        <option key={date.date} value={date.date}>
                          {new Date(date.date + 'T00:00:00').toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })} ({date.slots_count} {date.slots_count === 1 ? 'slot' : 'slots'})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Time Selection */}
                <div className="flex flex-col">
                  <label htmlFor="appointment_time" className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                    Preferred Time * 
                    {formData.appointment_date && (
                      <span className="text-xs font-normal text-slate-500 ml-2">
                        ({formatDuration(formData.duration_minutes)} session)
                      </span>
                    )}
                  </label>
                  {!formData.appointment_date ? (
                    <div className="px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium">Select a date first</div>
                  ) : loading ? (
                    <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm font-medium animate-pulse">Loading available times...</div>
                  ) : availableSlots.length > 0 ? (
                    <select
                      id="appointment_time"
                      name="appointment_time"
                      value={formData.appointment_time}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-inherit transition-all bg-slate-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-600/30"
                    >
                      <option value="">Select a time</option>
                      {availableSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {new Date(`2000-01-01T${slot}:00`).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                      No available times for this date with a {formatDuration(formData.duration_minutes)} session. Try a shorter duration.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Notes Section */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-serif font-bold text-slate-900 mb-2">Additional Information</h2>
                <div className="w-12 h-1 bg-gradient-to-r from-amber-700 to-amber-500 rounded"></div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="notes" className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">Notes or Message (Optional)</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Tell us about your legal matter, your concerns, and any specific details that would be helpful for your consultation..."
                  rows={4}
                  className="px-4 py-3 border border-slate-200 rounded-lg text-slate-900 font-inherit transition-all bg-slate-50 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-600/30 placeholder:text-slate-400 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-slate-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white font-semibold rounded-lg transition-all duration-300 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-700/20 hover:not-disabled:shadow-xl hover:not-disabled:shadow-amber-700/30"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-amber-200 border-t-white rounded-full animate-spin"></span>
                    Booking...
                  </span>
                ) : (
                  'Book Your Appointment'
                )}
              </button>
              
              <p className="text-slate-500 text-xs text-center mt-6">
                * Required fields. You'll receive a confirmation email with all the appointment details. <br/>
                We typically respond within 24 hours.
              </p>
            </div>
          </form>
          {error && (
            <div className="mb-8 p-6 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-800 animate-in fade-in slide-in-from-top">
              <div className="flex">
                <div className="flex-shrink-0 text-red-700 text-xl">⚠️</div>
                <div className="ml-4 text-sm font-medium">{error}</div>
              </div>
            </div>
          )}
          {success && (
            <div className="mb-8 p-6 rounded-lg bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 animate-in fade-in slide-in-from-top">
              <div className="flex">
                <div className="flex-shrink-0 text-emerald-700 text-xl">✓</div>
                <div className="ml-4 text-sm font-medium">{success}</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-amber-700 to-amber-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '50px 50px'}}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
            Questions Before Booking?
          </h2>
          <p className="text-base text-amber-50 mb-8 leading-relaxed max-w-2xl mx-auto">
            Feel free to reach out to us directly. Our team is ready to answer any questions you may have.
          </p>
          <a
            href="/"
            className="inline-block bg-white hover:bg-amber-50 text-amber-700 font-semibold py-3 px-8 rounded-lg transition-all hover:shadow-lg"
          >
            Return Home
          </a>
        </div>
      </section>
    </main>
  );
}
