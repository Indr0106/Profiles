import React, { useEffect, useState } from 'react'
import './learn.css'
import Card from 'react-bootstrap/Card';


interface DataLearn {
  title: string;
  path_image: string;
  info: string;
}

function Learn() {

const data_learn : DataLearn[] = [
  {
    title: 'Javascript',
    path_image: './assets/js.png',
    info: 'JavaScript adalah bahasa pemrograman yang digunakan untuk membuat konten web interaktif. Dengan JavaScript, kamu bisa membuat elemen dinamis seperti animasi, form yang responsif, dan banyak lagi.'
  },
  {
    title: 'HTML',
    path_image: './assets/html.png',
    info: 'HTML (HyperText Markup Language) adalah bahasa markup standar untuk membuat halaman web. HTML digunakan untuk mendeskripsikan struktur konten di web dengan elemen-elemen seperti heading, paragraf, dan tautan.'
  },
  {
    title: 'CSS',
    path_image: './assets/css.png',
    info: 'CSS (Cascading Style Sheets) adalah bahasa yang digunakan untuk mendesain dan mengatur layout halaman web. Dengan CSS, kamu dapat mengontrol warna, font, spasi, dan tata letak elemen HTML.'
  },
];
const [currentData, setCurrentData] = useState<DataLearn[]>([]);
useEffect(()=>{
  setCurrentData(data_learn)
},[])


 const rotateData = (e:React.TouchEvent<HTMLDivElement>) => {
  const touchY = e.touches[0].clientY;
  // Logika untuk menentukan apakah swipe ke atas
  // Misalnya, jika touchY di bagian atas layar, maka kita bisa menggeser
  if (touchY < 100) {
      
    setTimeout(() => {
      const newDataLearn = [
        currentData[1], // Elemen di indeks 1 menjadi 0
        currentData[2], // Elemen di indeks 2 menjadi 1
        currentData[0], // Elemen di indeks 0 menjadi 2
      ];
      setCurrentData(newDataLearn);
    }, 2500); 
   
};
 }

// const prevSlide = () => {
    
// };
const handler = (e: React.MouseEvent<HTMLDivElement>)=>{
  const docs = document.querySelectorAll('.flip-inner');

  // Mendapatkan elemen .flip-inner yang relevan
  const flipInner = e.currentTarget.querySelector('.flip-inner') as HTMLElement;

  if (flipInner) {
    // Cek apakah elemen sudah memiliki kelas 'is-flipped'
    const isFlipped = flipInner.classList.contains('is-flipped');

    // Menghapus kelas 'is-flipped' dari semua elemen
    docs.forEach(doc => {
      doc.classList.remove('is-flipped');
    });

    // Jika elemen belum aktif, tambahkan kelas 'is-flipped'
    if (!isFlipped) {
      flipInner.classList.add('is-flipped');
    }
  }
}

  return (
    <div className='section learn'>
      <div className='learn-head'>
        <h1>Learn</h1>
        
      </div>
      {/* <div className='card-cont'>
         {currentData&& currentData.map((data,i)=>{
          return(
      
            <Card onTouchMove={rotateData} key={data.title + i} className={`card c${i} `} >
              <Card.Img variant="top"   src={data.path_image} alt={data.title} />
              <Card.Body>
                <Card.Title style={{textAlign:'center'}}>{data.title}</Card.Title>
                <Card.Text>
                </Card.Text>
              </Card.Body>
            </Card>
    
          )
         })}
      </div> */}
      <div className='cont-flip-card'>
        {currentData && currentData.map((data,i)=>{
          return(
            <div key={data.title+'_key'} className={`flip-card card${i}`} onTouchMove={rotateData}  onClick={(e)=>{handler(e)}}>
            <div className='flip-inner'>
             <div className='card-face front'>
               <div className='cardC'>
                  <img className='img-learn' src={data.path_image} alt={data.title+"_img"}/>
                  <div>
                    <h2>{data.title}</h2>
                  </div>
               </div>
             </div>
             <div className='card-face back' style={{
               backgroundImage:'url(./assets/bgc.png)',
               backgroundPosition:'center',
               backgroundRepeat:'no-repeat',
               backgroundSize:"cover",
              
               color:'white'
             }}>
               <div className='info-cont'>
                <h2 style={{textAlign:'center'}}>{data.title}</h2>
                <div>
                  <p>{data.info}</p>  
                </div>
               </div>
               
             </div>
            </div>
           </div>
          )
        })}
       

      </div>
      <div className='cont-ball' style={{zIndex:'10'}}>
         {data_learn && data_learn.map((data,i)=>{
          return(
            <span className={`ball-learn ${data?.title === currentData[0]?.title?'active':'' }`} key={i}></span>
          )
         })}
      </div>
    </div>
  )
}

export default Learn