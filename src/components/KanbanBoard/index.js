import React from 'react';
import Ticket from '../Ticket';
import './index.css';

const priorityMap = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No Priority',
};

// Sort function based on user choice
const sortTickets = (tickets, sorting) => {
  if (sorting === 'priority') {
    return tickets.sort((a, b) => b.priority - a.priority);
  }
  if (sorting === 'title') {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  }
  return tickets;
};

// Group tickets based on user choice
const groupTickets = (tickets, grouping) => {
  const groups = {};

  tickets.forEach(ticket => {
    let groupKey;
    if (grouping === 'status') {
      groupKey = ticket.status;
    } else if (grouping === 'user') {
      groupKey = ticket.userId; // Group by user ID (field userId in the ticket)
    } else if (grouping === 'priority') {
      groupKey = priorityMap[ticket.priority];
    }

    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(ticket);
  });

  return groups;
};

// Function to get user details by userId
const getUserDetails = (userId, users = []) => {
  // Ensure the users array exists and find the user by their ID
  return users.find(user => user.id === userId);
};

const KanbanBoard = ({ tickets, grouping, sorting, users = [] }) => {
  const sortedTickets = sortTickets([...tickets], sorting); // Sort tickets based on priority or title
  const groupedTickets = groupTickets(sortedTickets, grouping); // Group the tickets based on the grouping (status, user, priority)

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map(group => {
        const user = grouping === 'user' ? getUserDetails(group, users) : null; // Fetch user details only when grouping by user

        return (
          <div key={group} className="kanban-column">
            <div className="kaban-header">
              <div className="kanban-details">
                {/* If grouping by user, display user's name; otherwise, display the group name (status or priority) */}
                {grouping === 'user' && user ? (
                  <>
                    <h2>{user.name}</h2>
                  </>
                ) : (
                  <>
                    <img src={`${group}.png`} alt={group} className="image" />
                    <h2>{group}</h2>
                  </>
                )}
                <p className="num">{groupedTickets[group].length}</p> {/* Display number of tickets in the group */}
              </div>
              <div>
                <img src="/add.png" alt="add" className="image" />
                <img src="/3 dot menu.png" alt="3 dots" className="image" />
              </div>
            </div>
            {groupedTickets[group].map(ticket => (
              <Ticket key={ticket.id} ticket={ticket} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
