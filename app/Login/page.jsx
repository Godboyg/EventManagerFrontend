"use client"
import React from 'react'
import "../globals.css"
import styles from "../page.module.css"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import Link from 'next/link';

function Login() {
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();
  
    const router = useRouter();
  
    const handleSubmit = async(e)=>{
      e.preventDefault();
      setEmail("");
      setPassword("");
      const data = { email , password};
      console.log("form submitted");
      const response = await axios.post("/loginUser", data );
      console.log("Res",response.data.token);
      let token = response.data.token;
      setTokenInCookie(token);

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
    <>
    <div className={styles.Main}>
      <div className={styles.Box}>
        <div className={styles.formBox}>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder='Email' id='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required={true}/>
            <input type="password" placeholder='Password' id='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required={true}/>
            <div className={styles.BtnBox}>
              <button className={styles.Btn}>Sign In</button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.headerIcon}>
        <Link href="/Register" className={styles.headerLink}>Sign Up</Link>
      </div>
    </div>
    </>
  )
}

export default Login