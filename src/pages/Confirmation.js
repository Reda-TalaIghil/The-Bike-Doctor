import React from 'react';
import '../styles/Confirmation.css';
import { IconCheck } from '../components/Icons';

function Confirmation({ service, dateTime, customerInfo, onNewBooking }) {
  const confirmationNumber = 'BD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="confirmation-container page-shell">
      <article className="confirmation-card">
        <div className="confirmation-top">
          <div className="success-icon">
            <IconCheck />
          </div>
          <h1>You're booked!</h1>
          <p className="confirmation-message">
            Thanks, <strong>{customerInfo.name}</strong>. We'll see you for your {service.name.toLowerCase()}.
          </p>
        </div>

        <div className="confirmation-body">
          <div className="confirmation-details">
            <h2>Your appointment</h2>
            <div className="detail-row">
              <span className="label">Confirmation #</span>
              <span className="value mono">{confirmationNumber}</span>
            </div>
            <div className="detail-row">
              <span className="label">Service</span>
              <span className="value">{service.name}</span>
            </div>
            <div className="detail-row">
              <span className="label">Price</span>
              <span className="value">{service.price}</span>
            </div>
            <div className="detail-row">
              <span className="label">When</span>
              <span className="value">{dateTime}</span>
            </div>
            <div className="detail-row">
              <span className="label">Duration</span>
              <span className="value">{service.duration}</span>
            </div>
          </div>

          <div className="customer-info">
            <h2>We have your info</h2>
            <p><strong>{customerInfo.name}</strong></p>
            <p>{customerInfo.email}</p>
            <p>{customerInfo.phone}</p>
          </div>

          <div className="important-info">
            <h3>Before you come in</h3>
            <ul>
              <li>We sent a confirmation to <strong>{customerInfo.email}</strong></li>
              <li>Try to show up <strong>10 minutes early</strong> if you can</li>
              <li>Need to change plans? Call us at <strong>(613) 555-BIKE</strong></li>
              <li>We're at <strong>123 Cycling Street, Ottawa, ON K1N 8Y5</strong></li>
            </ul>
          </div>

          <div className="shop-hours">
            <h3>Shop hours</h3>
            <p>Monday to Friday, 9 AM to 6 PM</p>
            <p>Saturday, 10 AM to 4 PM. Closed Sundays.</p>
          </div>

          <div className="confirmation-actions">
            <button className="btn-primary" onClick={onNewBooking}>
              Book another visit
            </button>
            <button className="btn-ghost" onClick={() => window.print()}>
              Print this
            </button>
          </div>

          <div className="thank-you">
            <p>See you soon. We'll take good care of your bike.</p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Confirmation;
