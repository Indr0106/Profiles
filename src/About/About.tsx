import React, { useEffect, useRef, useState } from 'react'
import './about.css'
function About() {


  
  return (
    <div className={`section about}`}>
      <div className='sec-header'>
        <h1>About Me</h1>
      </div>
      <div className='cont-about'>
        <div className="about-me">
          <p className="intro">I am a <span className="highlight">web enthusiast</span> passionate about <span className="highlight">learning design</span> and <span className="highlight">web development</span>. I enjoy <span className="highlight">exploring the latest technologies</span> and <span className="highlight">creating meaningful projects</span>.</p>
        </div>
      </div>
      
    </div>
  )
}

export default About