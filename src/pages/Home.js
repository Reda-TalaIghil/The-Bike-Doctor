import React from 'react';
import '../styles/Home.css';
import { IconWheel, IconClock, IconPin, IconPhone, IconWrench, IconBrake, IconChain, IconArrow } from '../components/Icons';

function Home({ onServiceClick, onNavigateHome }) {
  return (
    <div className="home-container page-shell">
      <nav className="page-nav page-nav--dark">
        <button className="brand" onClick={onNavigateHome}>
          <IconWheel className="brand-mark" />
          <span className="brand-name">
            The BikeDoctor
            <span>Ottawa · since 2011</span>
          </span>
        </button>
        <span className="status-sticker">Open now</span>
      </nav>

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text">
            <span className="hero-eyebrow">Your local bike shop</span>
            <h1 className="hero-title">
              We'll get your bike running <em>right</em>.
            </h1>
            <p className="hero-subtitle">
              Fast repairs, fair prices, and mechanics who ride too.
              Come by whenever you like, or book a time online.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={onServiceClick}>
                Book a repair
                <IconArrow />
              </button>
              <button className="btn-ghost" onClick={onServiceClick} style={{ color: 'var(--cream)', borderColor: 'rgba(255,255,255,0.25)' }}>
                See prices
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <IconWheel className="hero-wheel" />
            <div className="hero-wheel-inner" aria-hidden="true" />
            <span className="hero-badge-float">Walk-ins welcome</span>
          </div>
        </div>
      </section>

      <div className="stats-strip">
        <div className="stat-item">
          <strong>15+</strong>
          <span>Years in Ottawa</span>
        </div>
        <div className="stat-item">
          <strong>Same-day</strong>
          <span>Most repairs done</span>
        </div>
        <div className="stat-item">
          <strong>4.9★</strong>
          <span>From local riders</span>
        </div>
        <div className="stat-item">
          <strong>Walk-in</strong>
          <span>No appointment needed</span>
        </div>
      </div>

      <section className="quick-info">
        <span className="section-label">Visit us</span>
        <h2>Hours, location & contact</h2>
        <div className="info-grid">
          <div className="info-card">
            <IconClock className="info-card-icon" />
            <h3>Hours</h3>
            <p>Monday to Friday, 9 AM to 6 PM</p>
            <p>Saturday, 10 AM to 4 PM</p>
            <p>Closed on Sundays</p>
          </div>
          <div className="info-card">
            <IconPin className="info-card-icon" />
            <h3>Location</h3>
            <p>123 Cycling Street</p>
            <p>Ottawa, ON K1N 8Y5</p>
            <p className="highlight">Bike parking out front</p>
          </div>
          <div className="info-card">
            <IconPhone className="info-card-icon" />
            <h3>Contact</h3>
            <p>(613) 555-BIKE</p>
            <p>hello@bikedoctor.ca</p>
            <p className="highlight">Walk-ins always welcome</p>
          </div>
        </div>
      </section>

      <section className="services-preview">
        <div className="services-preview-header">
          <div>
            <span className="section-label">Services</span>
            <h2>What we work on</h2>
          </div>
          <button className="btn-ghost" onClick={onServiceClick}>See all</button>
        </div>
        <div className="services-list">
          <div className="service-item">
            <IconWrench className="service-item-icon" />
            <h4>Tune-Up</h4>
            <p className="price">$45</p>
          </div>
          <div className="service-item">
            <IconBrake className="service-item-icon" />
            <h4>Brake Service</h4>
            <p className="price">$60</p>
          </div>
          <div className="service-item">
            <IconWheel className="service-item-icon" />
            <h4>Tire Replacement</h4>
            <p className="price">$50</p>
          </div>
          <div className="service-item">
            <IconChain className="service-item-icon" />
            <h4>Chain Service</h4>
            <p className="price">$35</p>
          </div>
        </div>
        <button className="btn-primary" onClick={onServiceClick}>
          Book an appointment
          <IconArrow />
        </button>
      </section>

      <section className="why-us">
        <div className="why-us-inner">
          <div>
            <span className="section-label" style={{ color: 'var(--gold-soft)' }}>Why riders come back</span>
            <h2>Small shop. Big care.</h2>
          </div>
          <ul className="benefits-list">
            <li>Mechanics with 15+ years on the bench</li>
            <li>Most jobs done the same day</li>
            <li>You know the price before we start</li>
            <li>Quality parts, backed by warranty</li>
            <li>Grab a coffee while you wait</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Home;
