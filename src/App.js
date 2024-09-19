import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KanbanBoard from './components/KanbanBoard';
import './App.css';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function App() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sorting, setSorting] = useState(localStorage.getItem('sorting') || 'priority');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Fetch tickets from API
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        if (response.data && Array.isArray(response.data.tickets)) {
          setTickets(response.data.tickets);
        } else {
          console.error("API response is not in the expected format.");
        }
      })
      .catch(error => {
        console.error("Error fetching the tickets!", error);
      });
  }, []);

  // Save state to local storage
  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sorting', sorting);
  }, [grouping, sorting]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="display-dropdown">
          <button onClick={() => setDropdownVisible(!dropdownVisible)} className="display-button">
          <img src={`${process.env.PUBLIC_URL}/Display.png`} alt="Display Icon" />
            Display
            <img src={`${process.env.PUBLIC_URL}/down.png`} alt="Down Icon" />
          </button>

          {dropdownVisible && (
            <div className="dropdown-content">
              <div className="grouping-section">
                <label>Grouping</label>
                <select onChange={e => setGrouping(e.target.value)} value={grouping}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              <div className="ordering-section">
                <label>Ordering</label>
                <select onChange={e => setSorting(e.target.value)} value={sorting}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>

      <KanbanBoard tickets={tickets} grouping={grouping} sorting={sorting} />
    </div>
  );
}

export default App;
