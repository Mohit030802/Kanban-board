import React from 'react';
import './TicketList.css';
import profile from '../assets/profile.svg'
import discaimer from '../assets/caution-sign.png'
import circle from '../assets/circle.png'
import more from '../assets/more.png'
import plus from '../assets/plus.png'
import backlog from '../assets/backlog.png'
import inprogress from '../assets/inprogress.png'
import todo from '../assets/checklist.png'
const getIconForStatus = (status) => {
    switch (status.toLowerCase()) {
        case 'todo':
            return todo;
        case 'in progress':
            return inprogress;
        case 'backlog':
            return backlog;
        default:
            return circle; 
    }
};
const TicketList = ({ tickets, users }) => {
    if (!tickets || !users) {
        return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
    }

    const organizedTickets = tickets.reduce((acc, ticket) => {
        const { status, userId, title, tag, id } = ticket;
        const userName = users.find((user) => user.id === userId)?.name || 'Unknown User';

        if (!acc[status]) {
            acc[status] = {
                tickets: [],
                count: 0,
            };
        }

        acc[status].tickets.push({ userId, title, tag, userName, id });
        acc[status].count += 1;

        return acc;
    }, {});

    return (
        <div className='tickets'>
            {Object.entries(organizedTickets).map(([status, { tickets, count }]) => (
                <div key={status} className='mainComp'>
                    <div className='topic'>
                        <h2>
                            <img src={getIconForStatus(status)} alt={status} />
                            {status} <span>{count}</span>
                        </h2>
                        <div className='topicddmore'>
                            <img src={plus} alt="plus" />
                            <img src={more} alt="" />
                        </div>
                    </div>
                    <ul >
                        <div className='card' >
                            {tickets.map((ticket, index) => (
                                <div className='cardEle' >

                                    <li key={index} >
                                        <div className='cardID'>
                                            {ticket.id}
                                            <img src={profile} alt="Profile Image" />
                                        </div>
                                        <div className='cardtitle'>
                                            {ticket.title}
                                        </div>
                                        <div className='cardtag'>
                                            <img src={discaimer} alt="" />
                                            <p><img src={circle} alt="" />{ticket.tag.join(', ')}</p>

                                        </div>
                                    </li>
                                </div>
                            ))}
                        </div>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default TicketList;
