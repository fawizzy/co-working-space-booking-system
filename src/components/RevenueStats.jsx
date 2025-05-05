
const RevenueStats = ({ stats, desks }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Revenue</h3>
        <div className="value">${stats.totalRevenue.toFixed(2)}</div>
      </div>
      
      <div className="stat-card">
        <h3>Total Bookings</h3>
        <div className="value">{stats.bookingsCount}</div>
      </div>
      
      <div className="stat-card">
        <h3>Hours Booked</h3>
        <div className="value">{stats.totalHoursBooked}</div>
      </div>
      
      <div className="stat-card">
        <h3>Average per Booking</h3>
        <div className="value">
          {stats.bookingsCount ? `$${(stats.totalRevenue / stats.bookingsCount).toFixed(2)}` : '$0.00'}
        </div>
      </div>
    </div>
  );
};

export default RevenueStats;