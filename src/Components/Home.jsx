import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TicketList from './TicketList'

const Home = () => {
   
    const [data,setData]=useState([])
    useEffect(() => {
        
        const fetchData = async () => {
          try {
            const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
            setData(response.data);
            // console.log(data.tickets)
            // console.log("hi")
            // console.log(data.users)
            

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <>
  
    <TicketList tickets={data.tickets} users={data.users}/>
      
    </>
  )
}

export default Home
