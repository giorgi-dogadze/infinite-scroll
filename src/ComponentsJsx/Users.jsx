import React, { useState, useEffect,useRef, useCallback } from 'react'
import axios from 'axios'
import styles from '../ComponentsCss/Users.module.css'
import {useNavigate } from 'react-router-dom'

function Users() {
  const [posts,setPosts]=useState([])
  const [pageNumber,setPageNumber]=useState(1)
  const [pageSize,setPageSize]=useState(20)
  const [loading,setLoading]=useState(false)
  const [hasMore,setHasMore]=useState(true)
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
    setLoading(true)
    axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${pageNumber}/${pageSize}`)
    .then(response=>{
      setPosts([...posts,...response.data.list])
      setLoading(false)
      setHasMore(response.data.list.length>0)
    })
    
  }, [pageNumber])
  
  return (
    <div className={styles.container}>
          {posts.map((post,index)=>{
          if(posts.length===index+1){
            return (<div className={styles.box} onClick={()=>navigate(`/user?postId=${post.id}`)} key={post.id} ref={posts.length===index+1?lastBox:undefined}>
            <div className={styles.picture}>
              <img src={post.imageUrl} alt=""></img>
            </div>
            <div className={styles.info}>
            <div className={styles.person}>{post.prefix} {post.name} {post.lastName}</div>
            <div className={styles.title}>{post.title}</div>
            </div>
          </div>)
          }else{
            return (<div className={styles.box} onClick={()=>navigate(`/user?postId=${post.id}`)} key={post.id}>
              <div className={styles.picture}>
                <img src={post.imageUrl} alt=""></img>
              </div>
              <div className={styles.info}>
              <div className={styles.person}>{post.prefix} {post.name} {post.lastName}</div>
              <div className={styles.title}>{post.title}</div>
              </div>
            </div>)
          }
          })} 
    </div>
  
  )
}

export default Users