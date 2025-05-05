
const RevenueCharts = ({ stats, desks }) => {
  return (
    <div className="chart-container">
      <div className="chart">
        <div className="chart-title">Revenue by Membership Tier</div>
        <div className="bar-container">
          <div className="bar-group">
            <div className="bar" style={{ 
              height: `${stats.revenueTiers.basic ? Math.max(stats.revenueTiers.basic / Math.max(stats.totalRevenue, 1) * 200, 10) : 0}px`,
              backgroundColor: '#3498db'
            }}></div>
            <div className="bar-label">Basic<br />${stats.revenueTiers.basic.toFixed(2)}</div>
          </div>
          
          <div className="bar-group">
            <div className="bar" style={{ 
              height: `${stats.revenueTiers.premium ? Math.max(stats.revenueTiers.premium / Math.max(stats.totalRevenue, 1) * 200, 10) : 0}px`,
              backgroundColor: '#2ecc71'
            }}></div>
            <div className="bar-label">Premium<br />${stats.revenueTiers.premium.toFixed(2)}</div>
          </div>
          
          <div className="bar-group">
            <div className="bar" style={{ 
              height: `${stats.revenueTiers.executive ? Math.max(stats.revenueTiers.executive / Math.max(stats.totalRevenue, 1) * 200, 10) : 0}px`,
              backgroundColor: '#f39c12'
            }}></div>
            <div className="bar-label">Executive<br />${stats.revenueTiers.executive.toFixed(2)}</div>
          </div>
          
          <div className="bar-group">
            <div className="bar" style={{ 
              height: `${stats.revenueTiers.team ? Math.max(stats.revenueTiers.team / Math.max(stats.totalRevenue, 1) * 200, 10) : 0}px`,
              backgroundColor: '#9b59b6'
            }}></div>
            <div className="bar-label">Team<br />${stats.revenueTiers.team.toFixed(2)}</div>
          </div>
        </div>
      </div>
      
      <div className="chart">
        <div className="chart-title">Desk Utilization</div>
        <div className="circle-stat">
          <div className="circle-stat-value">
            {Math.round((desks.filter(d => d.booked).length / Math.max(desks.length, 1)) * 100)}%
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          {desks.filter(d => d.booked).length} of {desks.length} desks booked
        </div>
      </div>
    </div>
  );
};

export default RevenueCharts;