
import React, { useEffect, useRef, useState } from 'react'
import './main.css'
import Navbar from '../navbar/Navbar';
import Home from '../Home/Home';
import About from '../About/About';
import Learn from '../Learn/Learn';
import Project from '../Project/Project';
import Contact from '../Contact/Contact';
import Main_Canvas from '../Three/Main_Canvas';
import { MessageProvider, useMessage } from '../Notif/Info_Provider';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Info from '../Notif/Info';
import LoadingPage from '../Pages/LoadingPage';
import { useProgress } from '@react-three/drei';

const sectionsList = [
 {el:<Home/>} ,
  {el:<About/>},
  {el:<Learn/>},
  {el:<Project/>},
  {el:<Contact/>}
];
function Main() {

  const [visibleCount, setVisibleCount] = useState(1);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

    const scrollTo = (sec:number) => {

       
    
          setVisibleCount(sec)
        
    };
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        if (visibleCount < sectionsList.length) {
          setVisibleCount((prevCount) => prevCount + 1);
        } else {
      
          setVisibleCount(1);
        }
      } else if (e.deltaY < 0) {
        if (visibleCount > 1) {
          setVisibleCount((prevCount) => prevCount - 1);
        } else {
         
          setVisibleCount(sectionsList.length);
        }
      }
    };

    const doc = document.querySelector('.container-sec') as HTMLDivElement;
    doc?.addEventListener('wheel', handleWheel);
    return () => {
      doc?.removeEventListener('wheel', handleWheel);
    };
  }, [visibleCount]);
  const { showMessage, messageQueue } = useMessage();

  const {loaded,total} = useProgress()
  const [isLoad,setIsLoad] = useState<Boolean>(true)
  useEffect(()=>{
    if(loaded == total){
      setIsLoad(false)
    }
  },[])
  return (
   
    <div className='main'>

      {isLoad?  
      
      <LoadingPage/>
      :
      <>
           <Info messages={messageQueue}/>
       
       <Navbar scrollTo={scrollTo}  visibleCount={visibleCount}/>
       <Main_Canvas active={visibleCount}/>
       <div className='container-sec'>
      
           {sectionsList.slice(0, visibleCount).map((section, index) => (
           <div 
             key={index} 
             ref={(el) => (sectionRefs.current[index] = el)} 
             className='section'
             style={{ height: '100vh', display: visibleCount === index + 1 ? 'block' : 'none' }}
           >
             {section.el}
           </div>
         ))}
          
       </div>
      </>
 
    }
     
     
     
  
   
  </div>
  )
}

export default Main