import React, { useState, useEffect, useRef } from 'react'
import { useKanban } from '../context/kanbanContext'
import Card from './card';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GoPlus } from "react-icons/go";
import { GiCircle } from "react-icons/gi";
import { IoOptionsOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";

const KanbanBoard = () => {
    const [order,setOrder]=useState("Priority");
    const [group,setGroup]=useState("Status");
    const [isOpen,setIsOpen]=useState(false);
    const {tickets,users}=useKanban();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen((prev) => !prev);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    const handleGroupChange = (e) => {
        setGroup(e.target.value);
    };

    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    };

    const getGroup = () => {
        if (group === "Priority") {
          return ["No Priority","Low","Medium","Medium","Urgent"]
        } else if (group === "Status") {
          return ["Backlog","Todo","In progress","Done","Cancelled"]
        } else if (group === "User") {
          return ["Anoop sharma","Yogesh","Suresh","Shankar Kumar","Ramesh"]
        } else {
          return [];
        }
      };

    const filterTickets=(ticket,value)=>{
        if (group==="Status"){
            return ticket.status===value;
        } else if(group==="User"){
            return users.filter((user)=>user.id===ticket.userId)[0].name===value;
        } else if(group==="Priority"){
            switch(value){
                case "No Priority": return ticket.priority===0;
                case "Low": return ticket.priority===1;
                case "Medium": return ticket.priority===2;
                case "High": return ticket.priority===3;
                case "Urgent": return ticket.priority===4;
            }
        }
        return false;
    }
  return (
    <div className='flex flex-col justify-start'>
        <div className='flex justify-between p-4 h-[2%] items-center'>
            <div className='w-[90px]'>
                <div className='flex items-center justify-around gap-1 relative text-gray-700 text-md p-2 px-3 shadow-md shadow-slate-300'>
                    <IoOptionsOutline />
                    <button 
                        id='displayButton' 
                        onClick={() => {
                            if (!isOpen) {
                            setIsOpen((prev) => !prev);
                            }
                        }}
                    >
                            Display
                    </button>
                </div>
                {isOpen && 
                    <div ref={dropdownRef} className='absolute top-20 w-1/5 p-5 text-md bg-white rounded-lg'>
                        <div className='flex justify-between mb-2'>
                            <p className='text-gray-700'>Grouping</p>
                            <select value={group} onChange={handleGroupChange}>
                                <option value="Status">Status</option>
                                <option value="User">User</option>
                                <option value="Priority">Priority</option>
                            </select>
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-gray-700'>Ordering</p>
                            <select value={order} onChange={handleOrderChange}>
                                <option value="Title">Title</option>
                                <option value="Priority">Priority</option>
                            </select>
                        </div>
                    </div>
                }
            </div>
            <MdDarkMode className='cursor-pointer' />
        </div>
        <div className='flex h-[98%] bg-slate-100 p-4 max-lg:flex-wrap max-sm:flex-col w-full'>
            {getGroup().map((item,i)=>(
                <div key={i} className='m-4 flex flex-col h-full w-[20%] max-sm:w-full grow'>
                    <div className='flex justify-between items-center'>
                        <div className='flex justify-start gap-2 items-center'>
                            <GiCircle className=''/>
                            <h2 className='text-md font-semibold'>{item}</h2>
                            <h2 className='text-md text-gray-500'>{tickets.filter((ticket)=>{return filterTickets(ticket,item)}).length}</h2>
                        </div>
                        <div className='flex'>
                            <GoPlus />
                            <BiDotsHorizontalRounded />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        {order==="Priority"? 
                        (tickets.filter((ticket)=>{return filterTickets(ticket,item)}).sort((a, b) => b.priority-a.priority).map((ticket)=>(
                            <Card key={ticket.id} ticket={ticket} user={users.filter((user)=>user.id===ticket.userId)}/>
                        ))) :                         
                        (tickets.filter((ticket)=>{return filterTickets(ticket,item)}).sort((a, b) => a.title.localeCompare(b.title)).map((ticket)=>(
                            <Card key={ticket.id} ticket={ticket} user={users.filter((user)=>user.id===ticket.userId)}/>
                        )))}
                    </div>
                </div>
            ))}
        </div>
    </div>

  )
}

export default KanbanBoard