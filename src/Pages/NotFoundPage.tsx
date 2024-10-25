import React, { useEffect, useState } from 'react'
import './notfound.css'
import { useNavigate } from 'react-router-dom'
function NotFoundPage() {
    const [count,setCount]= useState<number>(5)
    const nav = useNavigate()
    useEffect(()=>{
        setInterval(()=>{
           setCount(count-1)
        },1000)
        if(count===0){
            nav('/')
        }
    },[count])
  return (
    <div className='not-cont'>
        
        <div className='head-not'>
            <h1 className='tag'>404</h1>
            <h3 className='sub-tag'>Error 404</h3>
        </div>
        <div className='tag2'>
            <h1>Page Not Found</h1>
            <p>Redirect to Home after <span style={{color:'red'}}> {count}</span></p>
        </div>
    </div>
  )
}

export default NotFoundPage