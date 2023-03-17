import React,{useEffect,useState} from 'react'
import styles from '../ComponentsCss/User.module.css'
import {useSearchParams } from 'react-router-dom'
import axios from 'axios'
import New from './New'

function User() {
  const [searchParams,setSearchParams]=useSearchParams()
  const postId=searchParams.get("postId")
  const [user,setUser]=useState({})
  const [loading,setLoading]=useState(false)
 
  useEffect(() => {
    setLoading(true)
    async function fetchData(){
      await axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${postId}`)
    .then(response=>{
      setUser(response.data)
      setLoading(false)
      /* console.log(response.data.company.name)
      console.log(user.company.name) */
    })
    }
    
  fetchData()
  }, [])
  if(loading){
    return <div>Gio</div>
  }
  console.log(user.company)
  console.log(user.company.name)
  console.log(user.company.suffix) 
  return(
    
    <div>Luka</div>
  )
  /* return (
    <div className={styles.container}>
        <div className={styles.userInfo}>
            <img src={user.imageUrl}></img>
            <fieldset>
              <legend>Info</legend>
              <div className={styles.person}>{user.prefix} {user.name} {user.lastName}</div>
              <div className={styles.title}>{user.title}</div>
              <div>Email: {user.email}</div>
              <div>Ip Address: {user.ip}</div>
              <div>Ip Address: {user.ip}</div>
              <div>Job Area: {user.jobArea}</div>
              <div>Job Type: {user.jobType}</div>
            </fieldset>
            <fieldset>
              <legend>Address</legend>
              <div >{user.company}</div>
              <div >{user.title}</div>
              <div>Email: {user.email}</div>
              <div>Ip Address: {user.ip}</div>
              <div>Ip Address: {user.ip}</div>
              <div>Job Area: {user.jobArea}</div>
              <div>Job Type: {user.jobType}</div>
            </fieldset>
        </div>
    </div>
  ) */
}

export default User