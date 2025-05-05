import { DESK_TYPES } from '../constants';

const DeskGrid = ({ desks, selectedDesk, onDeskSelect }) => {
  return (
    <div className="desks-grid">
      {desks.map(desk => (
        <div 
          key={desk.id}
          className={`desk ${desk.type} ${desk.booked ? 'booked' : ''} ${selectedDesk?.id === desk.id ? 'selected' : ''}`}
          onClick={() => onDeskSelect(desk)}
        >
          <div className="desk-number">{desk.number}</div>
          <div className="desk-type">
            {desk.type === DESK_TYPES.INDIVIDUAL ? 'Individual' : 'Team'}
          </div>
          {desk.booked && <div>Booked</div>}
        </div>
      ))}
    </div>
  );
};

export default DeskGrid;