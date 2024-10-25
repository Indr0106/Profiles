import React, { useState } from 'react'
import './contact.css'
import {Form,Button} from 'react-bootstrap'
import axios from 'axios'
import { error } from 'node:console'
import { useMessage } from '../Notif/Info_Provider'




function Contact() {
  const [send,setSend] = useState(false)
  const {showMessage} = useMessage()
  const sendMess = async(e:React.FormEvent<HTMLFormElement>)=>{
    setSend(true)
    e.preventDefault()
    const el = e.currentTarget; // Mengambil elemen form
    const formData = new FormData(el)
    const td = new Date().toLocaleString('id-Id')
    formData.append('Date',td)
    const a : string | undefined= process.env.REACT_APP_KEY;
    
    formData.append('Creeds',a ?? "nothing")
    try {
      const send = await fetch(`https://script.google.com/macros/s/${process.env.REACT_APP_URL1}/exec`,{
        method:'POST',
        body:formData,
      })
      .then((res)=>res.json()).then((data)=>{
        if(data.message === 'Something Err'){
          throw new Error('Message cant Send')
        }

        console.log(data.message)
        showMessage('success', `bi-envelope-check-fill`, 'Pesan Terkirim')

      })
      el.reset()
      setSend(false)
    } catch (error) {
      console.log(error)
      showMessage('error', ` bi-envelope-exclamation-fill`, 'Pesan Gagal Terkirim!')
      setSend(false)
    }
 
    
 
  }
  const [max,setMax] = useState<number>(0)

  const checker = async(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    
    setMax(e.target.textLength)
  }

  const gotTo = (d:string) =>{
    window.open(d,'_blank');
  }
  return (
    <div className='section contact'>
      <div className='cont-head'>
        <h1>Contact's Info</h1>
      </div>
      <div className='cont-info'>
        
        <div className='cont-mes'>
          <h3 style={{textAlign:'center'}}>Send Message</h3>
          <div>
          <Form onSubmit={sendMess}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control minLength={3} maxLength={23} type="text" name='Name' placeholder="Enter Your Name" required/>
            
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" maxLength={32} placeholder="Enter email" name='Email' required/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{width:'100%'}}>Message <span style={{float:'right',color:max==160?'red':'white',

                fontSize:'12px',
                position:'relative',
                top:'10px',
              }}>{max}/160</span></Form.Label>
              <Form.Control onChange={checker} as={"textarea"} type="text" placeholder="Message" 
               style={{minHeight:'100px',maxHeight:'150px'}} name='Message' required
               maxLength={160} minLength={3}
              />
            </Form.Group>
           
            <button style={{padding:'10px 20px',
            border: '2px solid white', 
            background: 'black', 
            borderRadius: '15px',
            color: 'white', 
            boxShadow: `5px 5px 10px ${send?'blue':'green'}`,

            }} type="submit" disabled={send} >
              {send?'Mengirim Pesan...':'Kirim'}
            </button>
          </Form>
          </div>
        </div>
        <div className='cont-con' style={{
          backgroundImage:'url(./assets/bg1.svg)',
          backgroundSize:'contain',
          backgroundPosition:'center',
          
        }} >
            <img className='contacts'  src='./assets/ig.svg'/>
       
            <img className='contacts' onClick={()=>{gotTo(`https://wa.me/+6285883584374`)}} src='./assets/wa.svg'/>
            <img className='contacts' onClick={()=>{gotTo(`https://github.com/Kororo212`)}} src='./assets/git.svg'/>
            <img className='contacts' onClick={()=>{gotTo(`https://mail.google.com/mail/?view=cm&fs=1&to=hudiindrawan01@gmail.com`)}} src='./assets/gmail.svg'/>
        </div>
       
        <div>

        </div>
      </div>
    </div>
  )
}

export default Contact

