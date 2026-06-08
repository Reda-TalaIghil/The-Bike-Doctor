import React, { useState } from 'react';
import '../styles/Booking.css';
import { IconWheel, IconCheck, SERVICE_ICONS } from '../components/Icons';
import {
  sanitizeName,
  sanitizeEmail,
  formatPhoneInput,
  validateName,
  validateEmail,
  validatePhone,
  validateBookingFields,
} from '../utils/validation';

const FIELD_VALIDATORS = {
  name: validateName,
  email: validateEmail,
  phone: validatePhone,
};

function Booking({ service, onSubmit, onBack, onNavigateHome }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const ServiceIcon = SERVICE_ICONS[service.iconKey] || SERVICE_ICONS.tuneUp;

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      if (date.getDay() !== 0) {
        dates.push(date);
      }
    }
    return dates;
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  ];

  const setFieldError = (field, message) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const validateField = (field, value) => {
    const validator = FIELD_VALIDATORS[field];
    if (!validator) return;
    setFieldError(field, validator(value));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let sanitized = value;

    if (name === 'name') sanitized = sanitizeName(value);
    else if (name === 'email') sanitized = sanitizeEmail(value);
    else if (name === 'phone') sanitized = formatPhoneInput(value);

    setCustomerInfo((prev) => ({ ...prev, [name]: sanitized }));

    if (touched[name]) {
      validateField(name, sanitized);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleDateSelect = (dateValue) => {
    setSelectedDate(dateValue);
    setFieldError('date', '');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFieldError('time', '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validateBookingFields({
      ...customerInfo,
      selectedDate,
      selectedTime,
    });

    setErrors(result.errors);
    setTouched({ name: true, email: true, phone: true });

    if (result.valid) {
      onSubmit({
        dateTime: `${selectedDate} at ${selectedTime}`,
        customerInfo: result.sanitized,
      });
    }
  };

  const availableDates = getAvailableDates();
  const currentStep = !selectedDate ? 1 : !selectedTime ? 2 : 3;

  return (
    <div className="booking-container page-shell">
      <nav className="page-nav">
        <button className="brand" onClick={onNavigateHome}>
          <IconWheel className="brand-mark" />
          <span className="brand-name">
            The BikeDoctor
            <span>Booking</span>
          </span>
        </button>
      </nav>

      <header className="page-header">
        <button className="back-link" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          Back to services
        </button>
        <span className="section-label">Booking</span>
        <h1>When works for you?</h1>
        <div className="service-pill">
          <ServiceIcon />
          <span>{service.name}</span>
          <span className="price">{service.price}</span>
        </div>
      </header>

      <div className="booking-progress" aria-hidden="true">
        {['Date', 'Time', 'Details'].map((label, i) => (
          <div key={label} className={`progress-step ${currentStep >= i + 1 ? 'active' : ''}`}>
            <div className="progress-dot">{i + 1}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="form-section">
          <legend>Pick a date</legend>
          <div className="date-picker">
            {availableDates.map((date, idx) => (
              <button
                key={idx}
                type="button"
                className={`date-btn ${selectedDate === date.toISOString().split('T')[0] ? 'selected' : ''}`}
                onClick={() => handleDateSelect(date.toISOString().split('T')[0])}
              >
                {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </button>
            ))}
          </div>
          {errors.date && <span className="error" role="alert">{errors.date}</span>}
        </fieldset>

        <fieldset className="form-section">
          <legend>Pick a time</legend>
          <div className="time-picker">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                className={`time-btn ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => handleTimeSelect(time)}
              >
                {time}
              </button>
            ))}
          </div>
          {errors.time && <span className="error" role="alert">{errors.time}</span>}
        </fieldset>

        <fieldset className="form-section">
          <legend>About you</legend>

          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={customerInfo.name}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="Lucy Tremblay"
              maxLength={80}
              autoComplete="name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={errors.name ? 'input-invalid' : ''}
            />
            {errors.name && (
              <span className="error" id="name-error" role="alert">{errors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={customerInfo.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              maxLength={254}
              autoComplete="email"
              inputMode="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={errors.email ? 'input-invalid' : ''}
            />
            {errors.email && (
              <span className="error" id="email-error" role="alert">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={customerInfo.phone}
              onChange={handleInputChange}
              onBlur={handleBlur}
              placeholder="(613) 555-1234"
              maxLength={14}
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={errors.phone ? 'input-invalid' : ''}
            />
            {errors.phone && (
              <span className="error" id="phone-error" role="alert">{errors.phone}</span>
            )}
            <span className="field-hint">Canadian or US phone number, 10 digits</span>
          </div>
        </fieldset>

        <div className="booking-summary">
          <h3>Summary</h3>
          <p><strong>Service</strong> {service.name}</p>
          <p><strong>Price</strong> {service.price}</p>
          <p><strong>Duration</strong> {service.duration}</p>
          {selectedDate && <p><strong>Date</strong> {selectedDate}</p>}
          {selectedTime && <p><strong>Time</strong> {selectedTime}</p>}
        </div>

        <button type="submit" className="submit-btn">
          <IconCheck />
          Confirm booking
        </button>
      </form>
    </div>
  );
}

export default Booking;
