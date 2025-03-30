"use client"
import React, { useDebugValue, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { toggleEvent } from '../redux/Slice.js';
import "../dashboard/dashboard.css"
import axios from 'axios'

function Card({ item , id , eventId , tru , att}) {

  const dispatch = useDispatch()
  const participants = useSelector((state) => state.event.events[eventId] || []);
  const issJoined = participants.includes(id);
  const userId = id;

  const [ isJoined , setIsJoined ] = useState(false)
  const [ joined , setJoined ] = useState([])

  const handleDelete = async()=>{
    const del = await axios.delete(`/myEvents/${item._id}`);
    console.log("deleted",del);
    window.location.reload();
  }

  const handle = async()=>{

    dispatch(toggleEvent({ eventId , userId }))

    const token = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));

    const tok = token.slice(7);

    const join = await axios.post(`/dashboard/events/join/${item._id}`, { token : tok });
    console.log("current event attendees",join.data.ev[0].attendees);
    setJoined(join.data.ev[0].attendees);

    if(join){
      setIsJoined(true);
    }

    if(isJoined){
      axios.post(`/dashboard/events/leave/${item._id}` , { id : id })
      .then((res)=>{
        console.log("response",res.data[0].attendees);
        setJoined(res.data[0].attendees);
        setIsJoined(false);
      })
    }
  }
  return (
        <div className="card">
          <h3 class="name">{item.eventName}</h3>
          <br/>
          <p>{item.description}</p>
          <br/>
          <p>{new Date(item.date).toLocaleString()}</p>
          <br/>
          <p>Attendee : { participants.length }</p>
          {/* <p>Attendee : { setJoined ? joined.length : "" }</p> */}
          {item.createdBy !== id && (
            <div className="cardbtn">
              <button className='btn' onClick={handle}>{ issJoined ? "Leave Event" : "Join Event" }</button>
            </div>
          )}
          {tru && (
            <div className="cardbtn">
              <button className='btn' onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
  )
}

export default Card