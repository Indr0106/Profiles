import React, { useEffect } from 'react'
import './loading.css'
import { useProgress } from '@react-three/drei'
function LoadingPage() {
    const { active, progress, errors, item, loaded, total } = useProgress()


  return (
    <div className='loading' style={{display:active?'block':'none'}}>
        <div className='cont-load'>
            <div className='load-head'>
                <span className='loader'/>
                <h1 className='load-tag'>Loading...</h1>
            </div>
            <div className='load-item'>
              <p>Load {loaded}/{total}:</p>
              <p className='items'>{item.replace(/\.\/assets\//g, '')}</p>
            </div>
        </div>
     
       
    </div>
  )
}

export default LoadingPage