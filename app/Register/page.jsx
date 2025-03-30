"use client"
import React, { useState } from 'react'
import "../globals.css"
import styles from "../page.module.css"
import axios from 'axios';
import { resolve } from 'styled-jsx/css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Register() {

  const [name , setName] = useState();
  const [email , setEmail] = useState();
  const [password , setPassword] = useState();

  const router = useRouter();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    const data = { name , email , password};
    console.log("form submitted");
    const response = await axios.post("/createUser", data );
    console.log(response.data.token);

    setTokenInCookie(response.data.token);

      function setTokenInCookie(token) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (15 * 24 * 60 * 60 * 1000));
    
        document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}`;
      }
    
    if(response.data){
      router.push("/dashboard");
    }
  }

  return (
    <div className={styles.Main}>
      <div className={styles.rBox}>
      <div className={styles.formBox}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Name' id='name' name='name' value={name} onChange={(e)=>setName(e.target.value)} required="true"/> 
          <input type="email" placeholder='Email' id='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required="true"/>
          <input type="password" placeholder='Password' id='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required="true"/>
          <div className={styles.BtnBox}>
            <button className={styles.Btn}>Sign Up</button>
          </div>
        </form>
      </div>
      <div className={styles.rheaderIcon}>
        <Link href="/Login" className={styles.headerLink}>Login</Link>
      </div>
      </div>
    </div>
  )
}

export default Register