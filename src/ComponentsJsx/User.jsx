import React,{useEffect,useState,useRef,useCallback} from 'react'
import styles from '../ComponentsCss/User.module.css'
import {useSearchParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

function User() {
  const [searchParams,setSearchParams]=useSearchParams()
  const postId=searchParams.get("postId")
  const [user,setUser]=useState({})
  const [pageNumber,setPageNumber]=useState(1)
  const [pageSize,setPageSize]=useState(20)
  const [loading,setLoading]=useState(false)
  const [hasMore,setHasMore]=useState(true)
  const [friendsPosts,setFriendPosts]=useState([])
  const [visitedPosts,setVisitedPosts]=useState([{prefix:"",name:"",lastName:""}])
  const navigate=useNavigate()
  const observer=useRef()

  const lastBox=useCallback((element)=>{
    if(loading) return
    if (observer.current) observer.current.disconnect()
    observer.current=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        setPageNumber(prev=>prev+1)
      }
    })
    if(element) observer.current.observe(element)
  },[loading,hasMore])
  
  useEffect(() => {
    axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${postId}`)
    .then(response=>{
      setUser(response.data)
      setVisitedPosts([...visitedPosts,{prefix:user.prefix,name:user.name,lastName:user.lastName,id:user.id}])
    })
  },[postId])
  
  useEffect(() => {
    setLoading(true)
    axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${postId}/friends/${pageNumber}/${pageSize}`)
    .then(response=>{
      setFriendPosts([...friendsPosts,...response.data.list])
      setLoading(false)
      setHasMore(response.data.list.length>0)
    })
  }, [pageNumber])

   return (
    <div className={styles.container}>
        <div className={styles.userInfo}>
            <img src={user.imageUrl} alt=""></img>
            <fieldset className={styles.info}>
              <legend>Info</legend>
              <div>
                <div className={styles.person}>{user.prefix} {user.name} {user.lastName}</div>
                <div><em>{user.title}</em></div>
              </div>
              <div>
                <div><span>Email</span>: {user.email}</div>
                <div><span>Ip Address</span>: {user.ip}</div>
                <div><span>Ip Address</span>: {user.ip}</div>
                <div><span>Job Area</span>: {user.jobArea}</div>
                <div><span>Job Type</span>: {user.jobType}</div>
              </div>
            </fieldset> 
            <fieldset className={styles.address}>
              <legend>Address</legend>
              <div className={styles.location}>{user.company?.name} {user.company?.suffix}</div>
              <div><span>City</span>: {user.address?.city}</div>
              <div><span>Country</span>: {user.address?.country}</div>
              <div><span>State</span>: {user.address?.state}</div>
              <div><span>Street Address</span>: {user.address?.streetAddress}</div>
              <div><span>ZIP</span>: {user.address?.zipCode}</div>
            </fieldset>
        </div>
        <div className={styles.visitedPosts}>

        {visitedPosts.map((post,index)=>(
          <a onClick={()=>navigate(`/user?postId=${post.id}`)} key={index}>{post.prefix} {post.name} {post.lastName}</a>
        ))}
        
        </div>
        <h2>Friends:</h2>
        <div className={styles.friendsList}>
        {friendsPosts.map((post,index)=>{
          if(friendsPosts.length===index+1){
            return (<div className={styles.box} onClick={()=>navigate(`/user?postId=${post.id}`)} key={post.id} ref={lastBox}>
            <div className={styles.picture}>
              <img src={post.imageUrl} alt=""></img>
            </div>
            <div className={styles.subInfo}>
            <div className={styles.person}>{post.prefix} {post.name} {post.lastName}</div>
            <div className={styles.title}>{post.title}</div>
            </div>
          </div>)
          }else{
            return (<div className={styles.box} onClick={()=>navigate(`/user?postId=${post.id}`)} key={post.id}>
              <div className={styles.picture}>
                <img src={post.imageUrl} alt=""></img>
              </div>
              <div className={styles.subInfo}>
              <div className={styles.person}>{post.prefix} {post.name} {post.lastName}</div>
              <div className={styles.title}>{post.title}</div>
              </div>
            </div>)
          }
          })} 
        </div>
    </div>
  ) 
}

export default User