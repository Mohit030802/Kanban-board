// Import necessary assets and libraries
import React, { useState } from 'react';
import './TicketList.css';
import profile from '../assets/profile.svg';
import discaimer from '../assets/caution-sign.png';
import circle from '../assets/circle.png';
import more from '../assets/more.png';
import plus from '../assets/plus.png';
import low from '../assets/low.svg';
import medium from '../assets/medium.svg';
import high from '../assets/high.svg';
import urgent from '../assets/urgent.svg';

// Function to get the icon based on ticket status
const getIconForStatus = (status) => {
    switch (status.toLowerCase()) {
        case 'todo':
            return 'To Do';
        case 'in progress':
            return 'In Progress';
        case 'backlog':
            return 'Backlog';
        default:
            return 'Unknown Status';
    }
};

// Function to get the label for priority
const getPriorityLabel = (priority) => {
    const priorityInt = parseInt(priority, 10);
    switch (priorityInt) {
        case 0:
            return 'No Priority';
        case 1:
            return 'Low';
        case 2:
            return 'Medium';
        case 3:
            return 'High';
        case 4:
            return 'Urgent';
        default:
            return 'Unknown Priority';
    }
};

// Function to get the icon for priority
const getIconForPriority = (priority) => {
    const priorityInt = parseInt(priority, 10);
    switch (priorityInt) {
        case 4:
            return urgent;
        case 3:
            return high;
        case 2:
            return medium;
        case 1:
            return low;
        case 0:
            return circle;
        default:
            return circle;
    }
};

// Function to organize tickets based on the grouping option
const organizeTickets = (tickets, users, groupingOption) => {
    if (!tickets) {
        return {};
    }

    switch (groupingOption) {
        case 'status':
            return tickets.reduce((acc, ticket) => {
                const { status, userId, title, tag, id, priority } = ticket;

                if (!acc[status]) {
                    acc[status] = {
                        tickets: [],
                        count: 0,
                    };
                }

                acc[status].tickets.push({ userId, title, tag, userName: null, id, priority });
                acc[status].count += 1;

                return acc;
            }, {});

        case 'priority':
            return tickets.reduce((acc, ticket) => {
                const { priority, userId, title, tag, id } = ticket;

                if (!acc[priority]) {
                    acc[priority] = {
                        tickets: [],
                        count: 0,
                    };
                }

                acc[priority].tickets.push({ userId, title, tag, userName: null, id, priority });
                acc[priority].count += 1;

                return acc;
            }, {});

        case 'user':
            return tickets.reduce((acc, ticket) => {
                const { userId, title, tag, id, priority } = ticket;
                const userName = users.find((user) => user.id === userId)?.name || 'Unknown User';

                if (!acc[userId]) {
                    acc[userId] = {
                        tickets: [],
                        count: 0,
                        userName,
                    };
                }

                acc[userId].tickets.push({ userId, title, tag, userName, id, priority });
                acc[userId].count += 1;

                return acc;
            }, {});

        default:
            return {};
    }
};

// TicketList component
const TicketList = ({ tickets, users }) => {
    const [groupingOption, setGroupingOption] = useState("status")
    if (!tickets || !users) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
    }

    const organizedTickets = organizeTickets(tickets, users, groupingOption);

    return (
        <div>
            <div>
                <label>
                    Group by:
                    <select value={groupingOption} onChange={(e) => setGroupingOption(e.target.value)}>
                        <option value="status">Status</option>
                        <option value="priority">Priority</option>
                        <option value="user">User</option>
                    </select>
                </label>
            </div>
            <div className='tickets'>
                {Object.entries(organizedTickets).map(([group, { tickets, count, userName }]) => (
                    <div key={group} className='mainComp'>
                        <div className='topic'>
                            <h2>
                                {groupingOption === 'user' ? userName : <span>{group} <span>{count}</span></span>}
                            </h2>
                            <div className='topicddmore'>
                                <img src={plus} alt='plus' />
                                <img src={more} alt='' />
                            </div>
                        </div>
                        <ul className='card'>
                            {tickets.map((ticket, index) => (
                                <div key={index} className='cardEle'>
                                    <li>
                                        <div className='cardID'>
                                            {ticket.id}
                                            <img src={profile} alt='Profile Image' />
                                        </div>
                                        <div className='cardtitle'>{ticket.title}</div>
                                        <div className='cardtag'>
                                            <img src={discaimer} alt='' />
                                            <p>
                                                <img src={circle} alt='' />
                                                {ticket.tag.join(', ')}
                                            </p>
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TicketList;
