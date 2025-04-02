"use client"
import React, { useEffect } from 'react'
import styles from "./page.module.css"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import Header from './components/Header';

function HomePage() {

  const router = useRouter();

  useEffect(()=>{

    const token = document.cookie.split(";").find((cookie) => cookie.trim().startsWith("token="));
    if(token){
      alert("user authenticated access allowed");
      router.push("/dashboard");
      return;
    }
  })

  return (
    <>
    <Header />
    <div className="main">
      <div className={styles.container}>
         <div className={styles.containerOne}>
          <div className={styles.kheaderIcon}>
            <Link className={styles.headerLink} href="/Register">Get Start for free</Link>
          </div>
         </div>
         <div className={styles.containerTwo}>
          <img className={styles.containerTwoImg} src="https://media.istockphoto.com/id/1349390515/photo/paperless-workplace-idea-e-signing-electronic-signature-document-management-businessman-signs.jpg?b=1&s=612x612&w=0&k=20&c=Rxh76rURBEJiY4uLPOSsH-Yiw9jF3bxLNVyrCqaIxTY=" alt="" />
         </div>
      </div>
    </div>
    </>
  )
}

export default HomePage
