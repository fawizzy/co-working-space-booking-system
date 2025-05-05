import React from 'react';
import { DESK_TYPES, MEMBERSHIP_TIERS, TEAM_DESK_HOURLY_RATE, DISCOUNT_PERCENTAGE } from '../constants';

const BookingForm = ({ 
  selectedDesk, 
  membershipTier, 
  setMembershipTier, 
  bookingDate,
  setBookingDate,
  bookingTime,
  setBookingTime,
  hours,
  setHours,
  priceDetails,
  onBooking,
}) => {
  const { basePrice, discount, total } = priceDetails;

  return (
    <>
      {selectedDesk ? (
        <>
          <div className="form-group">
            <label>Selected Desk</label>
            <input 
              type="text" 
              value={`Desk ${selectedDesk.number} (${selectedDesk.type === DESK_TYPES.INDIVIDUAL ? 'Individual' : 'Team'})`}
              readOnly
            />
          </div>
          
          {selectedDesk.type === DESK_TYPES.INDIVIDUAL && (
            <div className="form-group">
              <label>Membership Tier</label>
              <select 
                value={membershipTier}
                onChange={(e) => setMembershipTier(e.target.value)}
              >
                {Object.values(MEMBERSHIP_TIERS).map(tier => (
                  <option key={tier.id} value={tier.id}>
                    {tier.name} (${tier.hourlyRate}/hour)
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {selectedDesk.type === DESK_TYPES.TEAM && (
            <div className="form-group">
              <label>Team Desk Rate</label>
              <input 
                type="text" 
                value={`$${TEAM_DESK_HOURLY_RATE}/hour`}
                readOnly
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="form-group">
            <label>Time</label>
            <input 
              type="time" 
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Hours</label>
            <input 
              type="number" 
              min="1"
              max="12"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value) || 1)}
            />
          </div>
          
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-item">
              <span>Base Price:</span>
              <span>${basePrice.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="summary-item discount">
                <span>Discount ({DISCOUNT_PERCENTAGE}%):</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="summary-item total">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          
          <button onClick={onBooking}>Book Now</button>
        </>
      ) : (
        <p>Please select a desk to continue</p>
      )}
      
    </>
  );
};

export default BookingForm;