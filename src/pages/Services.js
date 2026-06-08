import React from 'react';
import '../styles/Services.css';
import { IconWheel, IconClock, IconWrench, IconBrake, IconChain } from '../components/Icons';

const SERVICES = [
  {
    id: 1,
    name: 'Tune-Up',
    price: '$45',
    iconKey: 'tuneUp',
    Icon: IconWrench,
    description: 'Gears, brakes, and wheels tuned up. Good as new for your daily ride.',
    duration: '1 hour'
  },
  {
    id: 2,
    name: 'Brake Service',
    price: '$60',
    iconKey: 'brake',
    Icon: IconBrake,
    description: 'New pads, clean rotors, cables set just right. Stop on a dime again.',
    duration: '45 min'
  },
  {
    id: 3,
    name: 'Tire Replacement',
    price: '$50',
    iconKey: 'tire',
    Icon: IconWheel,
    description: 'Fresh tires on, old ones off. We balance them and check the pressure too.',
    duration: '1 hour'
  },
  {
    id: 4,
    name: 'Chain Service',
    price: '$35',
    iconKey: 'chain',
    Icon: IconChain,
    description: 'Deep clean, fresh lube, and a new chain if yours is worn out.',
    duration: '30 min'
  },
  {
    id: 5,
    name: 'Full Maintenance',
    price: '$120',
    iconKey: 'full',
    Icon: IconWrench,
    description: 'The works. We go over everything and send you home road-ready.',
    duration: '2 hours'
  },
  {
    id: 6,
    name: 'Custom Mods',
    price: 'Quote',
    iconKey: 'custom',
    Icon: IconWrench,
    description: "Want something specific? Tell us how you ride and we'll figure it out.",
    duration: 'Varies'
  }
];

function Services({ onServiceSelect, onBack, onNavigateHome }) {
  return (
    <div className="services-container page-shell">
      <nav className="page-nav">
        <button className="brand" onClick={onNavigateHome}>
          <IconWheel className="brand-mark" />
          <span className="brand-name">
            The BikeDoctor
            <span>Services</span>
          </span>
        </button>
      </nav>

      <header className="page-header">
        <button className="back-link" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          Back home
        </button>
        <span className="section-label">Services</span>
        <h1>What's going on with your bike?</h1>
        <p>Pick a service and we'll set up a time. Not sure? Just walk in or give us a call.</p>
      </header>

      <div className="services-grid">
        {SERVICES.map((service) => (
          <article key={service.id} className="service-card">
            <div className="service-card-top">
              <service.Icon className="service-icon" />
              <p className="service-price">{service.price}</p>
            </div>
            <div className="service-card-body">
              <h3>{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <span className="service-duration">
                <IconClock />
                {service.duration}
              </span>
              <button
                className="service-btn"
                onClick={() => onServiceSelect({ ...service, iconKey: service.iconKey })}
              >
                Book this
              </button>
            </div>
          </article>
        ))}
      </div>

      <section className="questions-section">
        <h2>Need help choosing?</h2>
        <p>Call <strong>(613) 555-BIKE</strong> or email <strong>hello@bikedoctor.ca</strong></p>
        <p>No appointment needed for walk-ins.</p>
      </section>
    </div>
  );
}

export default Services;
export { SERVICES };
