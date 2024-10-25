import React, { useEffect, useRef, useState } from 'react'
import './home.css'
import Footer from '../Body/Footer'
function Home() {
  
  return (
      <div  className='section home'>
        <Footer/>
          <div className='container container-sec'>
              <div>
              <p className={'greet'} style={{color:'white'}} ><span style={{backgroundColor:'black',border:'2px solid black',color:'white',
                borderRadius:'5px',
                padding:'5px'
              }}>Hello</span> i'am</p>
                  <h1   className={'dp-name'}>Hudi Indrawan</h1>
              </div>
              <div>
                  <img
                  className={'dp-img'}
                     
                      style={{
                          borderRadius: '10px',
                          maxWidth: '90%',
                          height: 'auto'
                      }}
                      width={'150px'}
                      height={'300px'}
                      src='./assets/img1.png'
                      alt='indr-photo'
                  />
              </div>
          </div>
      </div>
  );
}
export default Home