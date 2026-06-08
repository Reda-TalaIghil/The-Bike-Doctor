import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Confirmation from './pages/Confirmation';
import { IconHome, IconWrench } from './components/Icons';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const goHome = () => setCurrentPage('home');

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setCurrentPage('booking');
  };

  const handleBookingSubmit = (bookingData) => {
    setSelectedDateTime(bookingData.dateTime);
    setCustomerInfo(bookingData.customerInfo);
    setCurrentPage('confirmation');
  };

  const handleReset = () => {
    setCurrentPage('home');
    setSelectedService(null);
    setSelectedDateTime(null);
    setCustomerInfo({ name: '', email: '', phone: '' });
  };

  return (
    <div className="App">
      {currentPage === 'home' && (
        <Home
          onServiceClick={() => setCurrentPage('services')}
          onNavigateHome={goHome}
        />
      )}
      {currentPage === 'services' && (
        <Services
          onServiceSelect={handleServiceSelect}
          onBack={goHome}
          onNavigateHome={goHome}
        />
      )}
      {currentPage === 'booking' && (
        <Booking
          service={selectedService}
          onSubmit={handleBookingSubmit}
          onBack={() => setCurrentPage('services')}
          onNavigateHome={goHome}
        />
      )}
      {currentPage === 'confirmation' && (
        <Confirmation
          service={selectedService}
          dateTime={selectedDateTime}
          customerInfo={customerInfo}
          onNewBooking={handleReset}
        />
      )}

      <footer className="app-footer">
        <p className="designer-credit">
          © 2026 The BikeDoctor · Conçu par Reda TALA IGHIL · SEG3525
        </p>
        <nav className="footer-nav" aria-label="Main navigation">
          <button
            className={`footer-btn ${currentPage === 'home' ? 'active' : ''}`}
            onClick={goHome}
          >
            <IconHome />
            Home
          </button>
          <button
            className={`footer-btn ${currentPage === 'services' || currentPage === 'booking' ? 'active' : ''}`}
            onClick={() => setCurrentPage('services')}
          >
            <IconWrench />
            Services
          </button>
        </nav>
      </footer>
    </div>
  );
}

export default App;
