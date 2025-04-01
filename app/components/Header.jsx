import React from 'react'
import Link from "next/link"
import styles from "../page.module.css"
import "../globals.css"

function Header() {
  return (
    <>
    <div className={styles.header}>
        <div className={styles.imgContainer}>
            <img className={styles.headerImg} src="https://images.pexels.com/photos/7679642/pexels-photo-7679642.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
        </div>
        <div className={styles.kheaderIcon}>
            <Link className={styles.headerLink} href="/Login">Sign in</Link>
        </div>
    </div>
    </>
  )
}

export default Header
