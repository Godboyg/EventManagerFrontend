"use client"
import React, { useEffect, useState } from 'react'
import "./nav.css"
import Link from "next/link"
import styles from "../page.module.css"
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

function Navbar() {

  const router = useRouter();

  const handleLogout = async()=>{
    Cookie.remove('token');

    router.push("/");

    console.log("user logged out");
  }

  return (
    <>
    <div className="nav-bar">
        <div className="text">
            <p>Event Manager</p>
        </div>
        <div className="icon">
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