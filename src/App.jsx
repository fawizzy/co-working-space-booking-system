import React, { useState, useEffect } from 'react';
import './App.css';
import DeskGrid from './components/DeskGrid';
import BookingForm from './components/BookingForm';

import { DESK_TYPES, MEMBERSHIP_TIERS, TEAM_DESK_HOURLY_RATE } from './constants';

function App() {
  const [desks, setDesks] = useState([]);
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [membershipTier, setMembershipTier] = useState(MEMBERSHIP_TIERS.BASIC.id);
  const [hours, setHours] = useState(1);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('booking');

  // Initialize desks
  useEffect(() => {
    initializeDesks();
    
    // Set current date and time as default
    const now = new Date();
    const dateString = now.toISOString().split('T')[0];
    setBookingDate(dateString);
    
    // Format time (HH:MM)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setBookingTime(`${hours}:${minutes}`);
  }, []);

  const initializeDesks = () => {
    const desksArray = [];
    // 10 individual desks
    for (let i = 1; i <= 10; i++) {
      desksArray.push({
        id: i,
        type: DESK_TYPES.INDIVIDUAL,
        number: i,
        booked: false,
      });
    }
    
    // 5 team desks
    for (let i = 11; i <= 15; i++) {
      desksArray.push({
        id: i,
        type: DESK_TYPES.TEAM,
        number: i,
        booked: false,
      });
    }
    
    setDesks(desksArray);
  };

  const handleDeskSelect = (desk) => {
    if (desk.booked) return;
    setSelectedDesk(desk);
    
    // Reset membership tier if changing desk type
    if (desk.type === DESK_TYPES.TEAM) {
      setMembershipTier('team');
    } else if (membershipTier === 'team') {
      setMembershipTier(MEMBERSHIP_TIERS.BASIC.id);
    }
  };
  
  const calculatePrice = () => {
    if (!selectedDesk) return { basePrice: 0, discount: 0, total: 0 };
    
    let hourlyRate;
    if (selectedDesk.type === DESK_TYPES.TEAM) {
      hourlyRate = TEAM_DESK_HOURLY_RATE;
    } else {
      hourlyRate = Object.values(MEMBERSHIP_TIERS).find(tier => tier.id === membershipTier)?.hourlyRate || 0;
    }
    
    const basePrice = hourlyRate * hours;
    let discount = 0;
    
    // Apply discount for bookings over 3 hours
    if (hours > 3) {
      discount = basePrice * 0.1; // 10% discount
    }
    
    const total = basePrice - discount;
    
    return { basePrice, discount, total };
  };
  
  const handleBooking = () => {
    if (!selectedDesk || !bookingDate || !bookingTime) return;
    
    const { basePrice, discount, total } = calculatePrice();
    
    // Create new booking
    const newBooking = {
      id: Date.now(),
      deskId: selectedDesk.id,
      deskNumber: selectedDesk.number,
      deskType: selectedDesk.type,
      membershipTier: selectedDesk.type === DESK_TYPES.TEAM ? 'team' : membershipTier,
      hours,
      date: bookingDate,
      time: bookingTime,
      basePrice,
      discount,
      total,
      timestamp: new Date().toISOString()
    };
    
    // Update bookings
    setBookings([...bookings, newBooking]);
    
    // Update desk status
    setDesks(desks.map(desk => 
      desk.id === selectedDesk.id ? { ...desk, booked: true } : desk
    ));
    
    // Reset form
    setSelectedDesk(null);
    setHours(1);
  };

 

  const priceDetails = calculatePrice();
  
  
 
  return (
    <div className="container">
      <header>
        <h1>Co-working Space Booking System</h1>
        <p>Book your ideal workspace for individual or team productivity</p>
      </header>
      
      <div className="booking-area">
        <div className="desk-container">
          <h2>Select a Desk</h2>
          <DeskGrid 
            desks={desks} 
            selectedDesk={selectedDesk}
            onDeskSelect={handleDeskSelect}
          />
           <div className="booking-form">
            <h2>Booking Details</h2>
            <BookingForm
              selectedDesk={selectedDesk}
              membershipTier={membershipTier}
              setMembershipTier={setMembershipTier}
              bookingDate={bookingDate}
              setBookingDate={setBookingDate}
              bookingTime={bookingTime}
              setBookingTime={setBookingTime}
              hours={hours}
              setHours={setHours}
              priceDetails={priceDetails}
              onBooking={handleBooking}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;