import React from 'react'
import './info.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
interface Message {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  icon: string; 
}

interface InfoMessageProps {
  messages: Message[];
}
const Info : React.FC<InfoMessageProps> = ({ messages }) => { 
  return (
    <div className='sec-mess'>
      <div className='cont-mess'>
        {messages && messages.map((data,i)=>{
         let color
         switch(data.type){
          case 'success':
            color = 'green'
            break;
          case 'error':
            color = 'red'
            break;
          case 'info':
            color = 'blue'
            break;
          case 'warning':
            color = 'yellow'
            break;
          default :
            color = 'blue'
         }
          return(
            <div key={data.type+i} className='mess' 
             style={{boxShadow:`5px 5px 10px ${color}`}}
            >
              <span role='img' className='shake'>  <i className={`bi ${data.icon}`}></i></span>
              <p>{data.message}</p>
            </div>
          )
        })}
    

      </div>
    </div>
  )
}

export default Info