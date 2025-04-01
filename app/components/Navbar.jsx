"use client"
import React, { useEffect, useState } from 'react'
import "./nav.css"
import "../globals.css"
import Link from "next/link"
import styles from "../page.module.css"
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import 'remixicon/fonts/remixicon.css';

function Navbar() {
  const [ isvisible , setIsVisible ] = useState(false);

  const router = useRouter();

  const handleLogout = async()=>{
    Cookie.remove('token');

    router.push("/");

    console.log("user logged out");
  }

  return (
    <>
    <div className={`h-screen w-[50vw] z-70 p-[4vw] bg-black absolute right-0 text-white ${isvisible ? "block" : "hidden"}`}>
            <div className="text-white flex rounded-full items-center justify-center h-[15vw] w-[15vw] text-[8vw] lg:h-[5vw] lg:w-[5vw] lg:text-[3vw] lg:ml-[80%] ml-[70%] border-1 border-cyan-600">
              <i class="ri-close-fill" onClick={e => setIsVisible(!isvisible)}></i>
            </div>
            <div className="h-[25vw] w-[25vw] lg:w-[10vw] lg:h-[10vw] rounded-full overflow-hidden">
                <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/30856712/pexels-photo-30856712/free-photo-of-stylish-young-adult-with-curly-hair-and-rings.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
            </div>
            <div className={styles.sheaderIcon}>
              <Link className={styles.sheaderLink} href="/dashboard">Home</Link>
            </div>
            <div className={styles.sheaderIcon}>
              <Link className={styles.sheaderLink} href="/dashboard/createEvent">Create Event</Link>
            </div>
            <div className={styles.sheaderIcon} onClick={handleLogout}>
                <button className={styles.snavBtn}>LogOut</button>
            </div>
        </div>
    <div className="nav-bar">
        <div className="text">
            <p>Event Manager</p>
        </div>
        <div className="icon">
             <i class="ri-align-justify text-4xl transition-all duration-300 md:hidden sm:hidden" onClick={() => setIsVisible(!isvisible)}></i>
            <div className={styles.headerIcon}>
              <Link className={styles.headerLink} href="/dashboard">Home</Link>
            </div>
            <div className={styles.headerIcon}>
              <Link className={styles.headerLink} href="/dashboard/createEvent">Create Event</Link>
            </div>
            <div className={styles.headerIcon} onClick={handleLogout}>
                <button className={styles.navBtn}>LogOut</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar