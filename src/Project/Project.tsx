import React, { useEffect, useState } from 'react'
import './project.css'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
interface Project {
  project_name: string;
  name: string;
  about: string;
  github: string;
  docker: string;
  web: string;
  img_path: string[];
}
interface Active {
  name?:string;
}
function Project() {
  const data_project : Project[]= [
    {
     project_name:'react-movie_app',
     name:'React Movie App',
     about:`This project is designed for learning purposes, focusing on React.js, utilizing APIs, and implementing Firebase Authentication.`,
     github:'https://github.com/Kororo212/movieapp',
     docker:'https://hub.docker.com/r/docker/indr01/movietest',
     web:'https://react-movies-1-app.netlify.app',
     img_path:[
          './assets/lap-1.png'
      ],
  
    },   {
      project_name:'react-gamebor_app',
      name:'React GameBor App',
      about:'`This project is designed for learning purposes, focusing on React.js, utilizing APIs, and implementing Firebase Authentication.`',
      github:'https://github.com/Kororo212/movieapp',
      docker:'https://hub.docker.com/r/indr01/gameborapp',
      web:'https://gamebor.netlify.app/',
      img_path:[
        './assets/lap-2.png'
      ],
  
     }
  
  
  ]
 const [active,setActive] = useState<Project |  null>(null)
 const changeData = (name:string)=>{
    const fil = data_project.filter((data)=>data.name === name)
    setActive(fil.length > 0 ? fil[0] : null)
 }
 useEffect(()=>{
    setActive(data_project[0])
 },[])

 const goTo = (data:string)=>{
  window.open(data, '_blank');
 }
  return (
    <div className='section project'>
      <div className='pro-head'>
        <h1>My Project's</h1>
      </div>
      <div>
      <div className='cont-select'>
      <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Select : {active?.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {data_project && data_project.map((data,i)=>{
          return(
            <Dropdown.Item key={i+data?.name} onClick={(e)=>{changeData(data.name)}}>
              {data.name}
            </Dropdown.Item>
          )
        })}
       
        
      </Dropdown.Menu>
    </Dropdown>
      </div>
      <div className='cont-cardPro mt-2'>
          <Card  className={`cardPro `}>
                    <Card.Body>
                      <Card.Title style={{textAlign:'center'}}>{active?.name}</Card.Title>
                      <Card.Img src={`${active?.img_path[0]}`} 
                      style={{maxHeight:'30vh',maxWidth:'100%',objectFit:'contain',
                        position: 'relative',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }} 
                      alt={`${active?.name}+_img`}></Card.Img>
                      <Card.Text style={{textAlign:'center',
                        position:'relative',
                        top:'-30px'
                      }}>
                        {active?.about}
                      </Card.Text>
                      <div className='cont-hub' >
                        <span className='hub' onClick={()=>{goTo(active?.github as string)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                                       <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                                    </svg>
                        </span>
                        <span className='hub' onClick={()=>{goTo(active?.web as string)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-browser-chrome" viewBox="0 0 16 16">
                                     <path fill-rule="evenodd" d="M16 8a8 8 0 0 1-7.022 7.94l1.902-7.098a3 3 0 0 0 .05-1.492A3 3 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8M0 8a8 8 0 0 0 7.927 8l1.426-5.321a3 3 0 0 1-.723.255 3 3 0 0 1-1.743-.147 3 3 0 0 1-1.043-.7L.633 4.876A8 8 0 0 0 0 8m5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a3 3 0 0 0-1.252.243 2.99 2.99 0 0 0-1.81 2.59M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
                                    </svg>
                        </span>
                        <span className='hub' onClick={()=>{goTo(active?.docker as string)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                                     <path d="M 20 9 L 20 14 L 10 14 L 10 19 L 5 19 L 5 24 L 1.125 24 C 0.640625 24 0.242188 24.335938 0.15625 24.8125 C 0.148438 24.847656 0 25.683594 0 26.75 C 0 27.449219 0.0664063 28.210938 0.1875 28.96875 C 1.332031 28.695313 3.429688 28.285156 3.0625 26.9375 C 5.035156 29.222656 9.769531 28.53125 10.96875 27.40625 C 12.308594 29.347656 20.113281 28.605469 20.65625 27.09375 C 22.335938 29.0625 27.542969 29.0625 29.21875 27.09375 C 29.761719 28.605469 37.535156 29.347656 38.875 27.40625 C 39.300781 27.804688 40.1875 28.136719 41.21875 28.3125 C 41.566406 27.652344 41.886719 26.988281 42.1875 26.28125 C 48.539063 26.203125 49.910156 21.636719 49.96875 21.4375 C 50.078125 21.054688 49.929688 20.660156 49.625 20.40625 C 49.519531 20.316406 47.175781 18.414063 43.375 19.0625 C 42.308594 15.589844 39.5625 14.007813 39.4375 13.9375 C 39.078125 13.734375 38.632813 13.765625 38.3125 14.03125 C 38.210938 14.113281 35.847656 16.117188 36.21875 20.21875 C 36.3125 21.25 36.582031 22.160156 37 22.96875 C 36.179688 23.425781 34.769531 24 32.5 24 L 32 24 L 32 19 L 27 19 L 27 9 Z M 41.21875 28.3125 C 41.097656 28.546875 40.941406 28.773438 40.8125 29 L 49.84375 29 C 48.757813 28.726563 46.425781 28.359375 46.8125 26.9375 C 45.535156 28.414063 43.109375 28.632813 41.21875 28.3125 Z M 40.8125 29 L 0.1875 29 C 0.429688 30.46875 0.929688 32.007813 1.6875 33.5 C 7.117188 34.777344 12.816406 32.832031 12.875 32.8125 C 13.398438 32.628906 13.945313 32.917969 14.125 33.4375 C 14.308594 33.957031 14.050781 34.539063 13.53125 34.71875 C 13.339844 34.785156 9.90625 35.9375 5.6875 35.9375 C 4.851563 35.9375 3.972656 35.890625 3.09375 35.78125 C 5.71875 39.261719 10.167969 42 17 42 C 27.804688 42 36.113281 37.410156 40.8125 29 Z M 0.1875 29 C 0.183594 28.984375 0.191406 28.984375 0.1875 28.96875 C 0.121094 28.984375 0.0585938 28.984375 0 29 Z M 22 11 L 25 11 L 25 14 L 22 14 Z M 12 16 L 15 16 L 15 19 L 12 19 Z M 17 16 L 20 16 L 20 19 L 17 19 Z M 22 16 L 25 16 L 25 19 L 22 19 Z M 7 21 L 10 21 L 10 24 L 7 24 Z M 12 21 L 15 21 L 15 24 L 12 24 Z M 17 21 L 20 21 L 20 24 L 17 24 Z M 22 21 L 25 21 L 25 24 L 22 24 Z M 27 21 L 30 21 L 30 24 L 27 24 Z M 16 31 C 16.128906 31 16.261719 31.019531 16.375 31.0625 C 16.253906 31.132813 16.15625 31.253906 16.15625 31.40625 C 16.15625 31.632813 16.335938 31.84375 16.5625 31.84375 C 16.714844 31.84375 16.867188 31.75 16.9375 31.625 C 16.988281 31.742188 17 31.863281 17 32 C 17 32.550781 16.550781 33 16 33 C 15.449219 33 15 32.550781 15 32 C 15 31.449219 15.449219 31 16 31 Z"></path>
                                    </svg>
                        </span>
                      </div>
                      {/* <div className='cont-pro'>
                        <div className='cont-device'>
                          <img className='img-pro' src={`${active?.img_path[0]}`} alt={`${active?.name}+_img`}/>
                        </div>
                           <div className='ball-cont'>
                                  <span className='ballpro'>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 30 30">
                                       <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                                    </svg>
                                  </span>
                                  <span className='ballpro'>
                                    
                                  </span>
                                  <span className='ballpro'>
                                   
                                  </span>
                                </div> 
                      </div>
                         */}
                    </Card.Body>

                  </Card>
                
      </div>

       
      </div>
    </div>
  )
}

export default Project