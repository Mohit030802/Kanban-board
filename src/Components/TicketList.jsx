import React, { useState } from 'react';
import './TicketList.css';
import profile from '../assets/profile.svg';
import discaimer from '../assets/caution-sign.png';
import circle from '../assets/circle.png';
import more from '../assets/more.png';
import plus from '../assets/plus.png';
import backlog from '../assets/backlog.png';
import inprogress from '../assets/inprogress.png';
import todo from '../assets/checklist.png';
import low from '../assets/low.svg';
import medium from '../assets/medium.svg';
import high from '../assets/high.svg';
import urgent from '../assets/urgent.svg';
import advertising from '../assets/advertising.png';
import down from '../assets/down.png';

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

const TicketList = ({ tickets, users }) => {
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => {
    setVisible(!visible)

  }
  const handleGroupingChange = (event) => {
    setGroupingOption(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  if (!tickets || !users) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  }

  const sortTickets = (tickets) => {
    switch (sortingOption) {
      case 'priority':
        return tickets.sort((a, b) => parseInt(b.priority, 10) - parseInt(a.priority, 10));
      case 'title':
        return tickets.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return tickets;
    }
  };

  const organizedTickets = tickets.reduce((acc, ticket) => {
    const { status, userId, title, tag, id, priority } = ticket;
    const userName = users.find((user) => user.id === userId)?.name || 'Unknown User';

    if (!acc[status]) {
      acc[status] = {
        tickets: [],
        count: 0,
      };
    }

    acc[status].tickets.push({ userId, title, tag, userName, id, priority });
    acc[status].count += 1;

    return acc;
  }, {});

  const organizedPriorityTickets = tickets.reduce((acc, ticket) => {
    const { priority, userId, title, tag, id } = ticket;
    const userName = users.find((user) => user.id === userId)?.name || 'Unknown User';

    if (!acc[priority]) {
      acc[priority] = {
        tickets: [],
        count: 0,
      };
    }

    acc[priority].tickets.push({ userId, title, tag, userName, id, priority });
    acc[priority].count += 1;

    return acc;
  }, {});

  const organizedUserTickets = tickets.reduce((acc, ticket) => {
    const { userId, title, tag, id, priority } = ticket;
    const userName = users.find((user) => user.id === userId)?.name || 'Unknown User';

    if (!acc[userName]) {
      acc[userName] = {
        tickets: [],
        count: 0,
      };
    }

    acc[userName].tickets.push({ userId, title, tag, userName, id, priority });
    acc[userName].count += 1;

    return acc;
  }, {});


  return (
    <div>
      <div className='displaybtn'>
        <button onClick={toggleVisible}> <img src={advertising} alt="Display" /> Display <ion-icon name="chevron-down-outline"></ion-icon> </button>
      </div>

      {visible &&
        <div className='groups'>
          <div className='group'>
            <label htmlFor="grouping">Grouping: </label>
            <select id="grouping" value={groupingOption} onChange={handleGroupingChange}>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className='sort'>
            <label htmlFor="sorting">Ordering: </label>
            <select id="sorting" value={sortingOption} onChange={handleSortingChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      }
      <div className='tickets'>
        {groupingOption === 'status' &&
          Object.entries(organizedTickets).map(([status, { tickets, count }]) => (
            <div key={status} className='mainComp'>
              <div className='topic'>
                <h2>
                  <img src={getIconForStatus(status)} alt={status} />
                  {status} <span>{count}</span>
                </h2>
                <div className='topicddmore'>
                  <img src={plus} alt='plus' />
                  <img src={more} alt='' />
                </div>
              </div>
              <ul className='card'>
                {sortTickets(tickets).map((ticket, index) => (
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
      <div className='tickets'>
        {groupingOption === 'priority' &&
          Object.entries(organizedPriorityTickets).map(([priority, { tickets, count }]) => (
            <div key={priority} className='mainComp'>
              <div className='topic'>
                <h2>
                  <img src={getIconForPriority(priority)} alt={`Priority ${priority}`} />
                  {getPriorityLabel(priority)} <span>{count}</span>
                </h2>
                <div className='topicddmore'>
                  <img src={plus} alt='plus' />
                  <img src={more} alt='' />
                </div>
              </div>
              <ul className='card'>
                {sortTickets(tickets).map((ticket, index) => (
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
      <div className='tickets'>
        {groupingOption === 'user' &&
          Object.entries(organizedUserTickets).map(([userName, { tickets, count }]) => (
            <div key={userName} className='mainComp'>
              <div className='topic'>
                <h2>{userName} <span>{count}</span></h2>
                <div className='topicddmore'>
                  <img src={plus} alt='plus' />
                  <img src={more} alt='' />
                </div>
              </div>
              <ul className='card'>
                {sortTickets(tickets).map((ticket, index) => (
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
