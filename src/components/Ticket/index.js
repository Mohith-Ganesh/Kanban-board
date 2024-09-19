import React from 'react';
import './index.css';

const Ticket = ({ ticket, user }) => {
  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-avatar">
          {console.log(ticket)}
          {/* Display initials if no user image is available */}
          {user?.initials || user?.name.charAt(0) + user?.name.charAt(1)}
        </div>
      </div>
      <h3 className="ticket-title">{ticket.title}</h3>
      <div className="ticket-footer">
        <img src='https://res.cloudinary.com/dttnhad6r/image/upload/v1726726386/Screenshot_2024-09-19_114200_kerfbi.png' alt='Todo' className='feat-img'/>
        <p className="ticket-tag">Feature Request</p>
      </div>
    </div>
  );
};

export default Ticket;
