import { DESK_TYPES, MEMBERSHIP_TIERS } from '../constants';

const BookingHistory = ({ bookings }) => {
  return (
    <div className="booking-history">
      <h3>Recent Bookings</h3>
      <table>
        <thead>
          <tr>
            <th>Desk</th>
            <th>Type</th>
            <th>Membership</th>
            <th>Date & Time</th>
            <th>Hours</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.deskNumber}</td>
                <td>{booking.deskType === DESK_TYPES.INDIVIDUAL ? 'Individual' : 'Team'}</td>
                <td>
                  {booking.membershipTier === 'team' 
                    ? 'Team' 
                    : Object.values(MEMBERSHIP_TIERS).find(t => t.id === booking.membershipTier)?.name
                  }
                </td>
                <td>{booking.date} at {booking.time}</td>
                <td>{booking.hours}</td>
                <td>${booking.total.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No bookings yet</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingHistory;