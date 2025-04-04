"use client"
import Navbar from '@/app/components/Navbar'
import React, { useEffect, useState } from 'react'
import "./event.css";
import "../../globals.css"
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

        const token = re.slice(6);
        setTok(token);

        const data = { eventName , description , date , token};

        const response = await axios.post("/api/createEvent", data);

        if(response){
            router.push("/dashboard");
        }
    }

    useEffect(()=>{

      const re = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));

      const token = re.slice(6);

      const myEvents = async()=>{
        const res = await axios.post("/api/myEvents", { token : token});
        console.log("resposne my event",res.data);
        setMyEvent(res.data);
      }

      const v = async()=>{
        const id = await verify(token);
        setId(id.data.decode._id);
      }
  
      v();

      myEvents();

    },[triggerEffect])

    useEffect(()=>{
      const runEffectTwice = () => {
        setTriggerEffect(true); 
        setTimeout(() => {
          setTriggerEffect(false); 
        }, 1000);
      };
  
      runEffectTwice();
    },[])

  return (
    <>
    <Navbar/>
    <div className="w-full p-[10vw] bg-[rgb(118,118,118)]">
        <div className="container-box">
            <p>Create Events</p>
            <div className="form">
                <form onSubmit={handleSubmit}>
                   <label id='label' htmlFor="">Event Name</label>
                   <input type="text" className='inp' placeholder='Event..' name='eventName' value={eventName} onChange={(e) => setEventName(e.target.value)} required={true}/>
                   <label id='label' htmlFor="">Description</label>
                   <textarea rows="4" cols="50" name='description' placeholder="Enter your description here..." required={true} value={description} onChange={(e) => setDescription(e.target.value)}/>
                   <label id='label' htmlFor="">Date</label>
                   <input type="date" name='date' className='inp' value={date} required={true} onChange={(e) => setDate(e.target.value)}/>
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
