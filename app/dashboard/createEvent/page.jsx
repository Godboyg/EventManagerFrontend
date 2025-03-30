"use client"
import Navbar from '@/app/components/Navbar'
import React, { useEffect, useState } from 'react'
import "./event.css";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Card from '@/app/components/Card';
import verify from "../verifyToken";

function CreateEvent() {

    const router = useRouter();

    const [triggerEffect, setTriggerEffect] = useState(false);
    const [eventName , setEventName] = useState()
    const [description , setDescription] = useState()
    const [date , setDate] = useState()
    const [tok , setTok] = useState()
    const [myEvent , setMyEvent] = useState([])
    const [id , setId] = useState()
    const [tru , setTrue] = useState(true)

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setEventName("");
        setDescription("");
        setDate("");

        const re = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));

        const token = re.slice(7);
        setTok(token);

        const data = { eventName , description , date , token};

        const response = await axios.post("/createEvent", data);

        if(response){
            router.push("/dashboard");
        }
    }

    useEffect(()=>{

      const re = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));

      const token = re.slice(7);

      const myEvents = async()=>{
        const res = await axios.post("/myEvents", { token : token});
        console.log("resposne my event",res.data);
        setMyEvent(res.data);
      }

      const v = async()=>{
        const id = await verify(token);
        console.log("id",id);
        setId(id);
      }
  
      v();

      myEvents();

    },[triggerEffect])

    useEffect(()=>{
      const runEffectTwice = () => {
        setTriggerEffect(true); // First time: Triggers effect
        setTimeout(() => {
          setTriggerEffect(false);  // Second time: Resets state, triggers effect again
        }, 1000); // Delay to simulate a "second" trigger
      };
  
      runEffectTwice();
    },[])

  return (
    <>
    <Navbar/>
    <div className="container">
        <div className="container-box">
            <p>Create Events</p>
            <div className="form">
                <form onSubmit={handleSubmit}>
                   <label id='label' htmlFor="">Event Name</label>
                   <input type="text" placeholder='Event..' name='eventName' value={eventName} onChange={(e) => setEventName(e.target.value)} required={true}/>
                   <label id='label' htmlFor="">Description</label>
                   <textarea rows="4" cols="50" name='description' placeholder="Enter your description here..." required={true} value={description} onChange={(e) => setDescription(e.target.value)}/>
                   <label id='label' htmlFor="">Date</label>
                   <input type="date" name='date' value={date} required={true} onChange={(e) => setDate(e.target.value)}/>
                   <button>Submit</button>
                </form>
            </div>
        </div>
        <div className="myEvents">
           <h1>My Events</h1>
           <div className="event-box">
            { myEvent.length === 0 ? (
               <p>No Event Found</p>
             ) : (
               myEvent.map((e,key)=>{
                 return (
                  <Card item={e} id={id} tru={tru}/>
                 )
               })
             )        
             }
           </div>
        </div>
    </div>
    </>
  )
}

export default CreateEvent