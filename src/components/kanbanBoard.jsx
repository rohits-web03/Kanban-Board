import React from 'react'
import { useKanban } from '../context/kanbanContext'
import Card from './card';

const KanbanBoard = () => {
    const {tickets,users}=useKanban();
    console.log("Tickets:",tickets,"Users:",users)
  return (
    <div>
        <h1>kanbanBoard</h1>
        {tickets.map((ticket)=>(
            <Card key={ticket.id} id={ticket.id} title={ticket.title} status={ticket.status} tag={ticket.tag} userId={ticket.userId} priority={ticket.priority}/>
        ))}
    </div>

  )
}

export default KanbanBoard