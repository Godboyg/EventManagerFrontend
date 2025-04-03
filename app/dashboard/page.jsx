"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar"
import { RiSearchLine } from 'react-icons/ri';
import debounce from 'lodash.debounce';
import "./dashboard.css";
import Card from '../components/Card';
import verify from "./verifyToken";
import Cookie from 'js-cookie';

function dashboard() {
  const router = useRouter();

  const [isAuthenticated , setisAuthenticated] = useState(false);
  const [event , setEvent] = useState([]);
  const [eventName , setEventName] = useState();
  const [sevents , setsEvents] = useState();
  const [id, setId] = useState();

  const getEvent = async()=>{
    const res = await axios.get("/api/events");
    setEvent(res.data);
  }

  window.onload = function () {
    getEvent();
  }

  //getEvent();

  console.log("all events",event);
  const searchEvent = debounce(async(query)=>{
    setEvent("");

    if(!query.trim()){
      setsEvents([]);
      return;
    }

    const data = { query };

    const response = await axios.post("/api/searchEvent", data);
    setEvent(response.data);
  },300);

  const handleInputChange = (e)=>{
    setEventName(e.target.value);
    searchEvent(e.target.value);
  }

  useEffect(()=>{
    try { 
      const token = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('token='));
      setisAuthenticated(true);
      if(!token){
        router.push("/");
      }
      const tok = token.slice(6);
      console.log("token",tok);
      const v = async()=>{
        const id = await verify(tok);
        console.log("token expires",id);
        if(id.status === 502){
         Cookie.remove("token");
         router.push("/");
        }
        console.log("id",id);
        setId(id);
      }
      v();
    } catch (error) { 
      alert("token expired login again");
      router.push("/");
    }
  },[])

  return (
    isAuthenticated ? (
      <div className="main">
        <Navbar />
        <div className="dashText">
          <h2>Welcome To Event Manager</h2>
          <div className="search">
            <p className='i'><RiSearchLine /></p>
            <input type="text" id="input" placeholder="Search Event......" value={eventName} onChange={handleInputChange}/>
          </div>
        </div>
        <button onClick={getEvent} className='ebtn'>Get All Events</button>
        <div className="cardContainers">
          { event.length === 0 ? (
            <p>No Event Found</p>
          ) : (
            event.map((e,key)=>{
              return (
                <Card item={e} id={id} eventId={e._id} att={event}/>
              )
            })
          )}
        </div>
      </div>
    ) : (
      <p>loading</p>
    )
  )
}

export default dashboard
