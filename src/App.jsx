import React, { useState, useEffect } from 'react';
import { KanbanProvider } from './context/kanbanContext';
import KanbanBoard from './components/kanbanBoard';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch("https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers");
      const data = await response.json(); // Parse response as JSON
      setTickets(data.tickets);
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  return (
    <KanbanProvider value={{ tickets, users }}>
      <KanbanBoard />
    </KanbanProvider>
  );
}

export default App;
