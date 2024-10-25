import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'

import { Points, ShaderMaterial, BufferGeometry, Float32BufferAttribute } from 'three';
import { Billboard, Box, Center, Extrude, Html, Line, MeshDistortMaterial, OrbitControls, PerspectiveCamera, Plane, Point, PointMaterial, RoundedBox, shaderMaterial, Sphere, Stars, Text, Text3D, useTexture, VideoTexture } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as TWEEN from '@tweenjs/tween.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';
import LoadingPage from '../Pages/LoadingPage';
const BasicParticles = () => {
  // This reference gives us direct access to our points
  const points = useRef();
  const dis = useRef()
  // You can see that, like our mesh, points also takes a geometry and a material,
  // but a specific material => pointsMaterial
  return (
    <points ref={points}>
      <sphereGeometry args={[1, 48, 48]} />
      <pointsMaterial color="#5786F5" size={0.015} sizeAttenuation={false} />
 
    </points>
  );
};
const CustomGeometryParticles = (props) => {
  const { count } = props;
  const radius = 2;

  // This reference gives us direct access to our points
  const points = useRef();

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const distance = Math.sqrt(Math.random()) * radius;
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 

      let x = distance * Math.sin(theta) * Math.cos(phi)
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }
    
    return positions;
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: {
      value: 0.0
    },
    uRadius: {
      value: radius
    }
  }), [])

  useFrame((state) => {
    const { clock } = state;

    points.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        depthWrite={false}
        fragmentShader={`void main() {
            gl_FragColor = vec4(0.34, 0.53, 0.96, 1.0);
          }`}
        vertexShader={`uniform float uTime;
          uniform float uRadius;
          
          // Source: https://github.com/dmnsgn/glsl-rotate/blob/main/rotation-3d-y.glsl.js
          mat3 rotation3dY(float angle) {
            float s = sin(angle);
            float c = cos(angle);
            return mat3(
              c, 0.0, -s,
              0.0, 1.0, 0.0,
              s, 0.0, c
            );
          }
          
          
          void main() {
            float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 1.5);
            float size = distanceFactor * 1.5 + 3.0;
            vec3 particlePosition = position * rotation3dY(uTime * 0.3 * distanceFactor);
          
            vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            vec4 projectedPosition = projectionMatrix * viewPosition;
          
            gl_Position = projectedPosition;
          
            gl_PointSize = size;
            // Size attenuation;
            gl_PointSize *= (5.0 / - viewPosition.z);
          }`}
        uniforms={uniforms}
      />
    </points>
  );
};

const NeonBox = () => {
  const neonRef = useRef(null)



  useFrame(({ clock }) => {
    const time = clock.getElapsedTime(); // Time in seconds since start
    const slowFactor = 0.5;  // Use a factor less than 1 to slow down motion (adjust this for speed)

    // Slow down the up and down movement (by multiplying time with slowFactor)
    neonRef.current.position.y = Math.sin(time * slowFactor) * 2;  // Multiply `time` by slowFactor for slower movement

    // Slow down the rotation (by multiplying time with slowFactor)
    neonRef.current.rotation.y = time * Math.PI * slowFactor; 
  });

  return (
    <mesh ref={neonRef} position={[0,2.1,0]} rotation={[0,3,0]}> 
      {/* Neon Box Geometry */}
      <RoundedBox args={[4, 1, 0.3]} radius={0.1} smoothness={4}>
        <meshStandardMaterial
          color={'blue'}
          emissive={'blue'}
          emissiveIntensity={1.5}
          metalness={0.5}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Neon Text */}
      <Text
        position={[0, 0, 0.2]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04} // Optional: for text border
        outlineColor="blue" // Neon glow outline
        
      >Welcome !
      </Text>
      <Text
        position={[0, 0, -0.2]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.04} // Optional: for text border
        outlineColor="blue" // Neon glow outline
        rotation={[0,3.2,0]}
      >
      Welcome !!
      </Text>
    </mesh>
  );
};
const Tween = ()=>{
  useFrame(()=>{
    TWEEN.update()
  })
}
const HomeBack = ({...props})=>{


  return(
    <>
    <CustomGeometryParticles count={1000}/>
     <NeonBox />
     <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.5} />
     </EffectComposer>
    </>
  
  )
}
const AboutBack = ({...props})=>{


  
  // useFrame(() => {
  //   if (portalRef.current) {
  //     portalRef.current.rotation.z += 0.01; // Rotasi portal
  //   }
  // });
  
  return (
    <>
     {/* <pointLight position={[10, 10, 10]} /> */}
     <Sphere visible position={[0,10,-6]} args={[1,100,200]} scale={1.2}>
        <MeshDistortMaterial
            color={"#8352FD"} 
            attach="material" 
            distort={0.8} 
            speed={5}
            roughness={0}
            emissiveIntensity={1}
        />
    </Sphere>
    </>
  );
}

const LearnBack = ()=>{

  const ref1 = useRef(null);
  const ref2 = useRef(null);

  useFrame(() => {
    if (ref1.current && ref2.current) {
      ref1.current.rotation.x += 0.02;
      ref2.current.rotation.y += 0.01; // Kecepatan berbeda
    }
  });

  return (
    <>
   
       <RoundedBox ref={ref1} args={[2, 2, 2, 0.3]} position={[-1, -13, -3]}>
        <meshStandardMaterial 
          color={'orange'} 
          emissive={'yellow'} // Warna cahaya yang dipancarkan
          emissiveIntensity={1} // Intensitas pancaran cahaya
        />
      </RoundedBox>
      <RoundedBox ref={ref2} args={[2, 2, 2, 0.3]} position={[2, -10, -3]}>
        <meshStandardMaterial 
          color={'red'} 
          emissive={'blue'} // Warna cahaya yang dipancarkan
          emissiveIntensity={1} // Intensitas pancaran cahaya
        />
      </RoundedBox>
    </>
  );
}
const ProBack = ()=>{

  const gr = useRef(null)
  const createPano = async()=>{
    const geometry = new THREE.SphereGeometry( 2, 64, 64 );
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale( - 1, 1, 1 );

    const texture = new THREE.TextureLoader().load( './assets/au.png' );
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial( { map: texture } );

    const mesh = new THREE.Mesh( geometry, material );
    if(gr.current){
      gr.current.add(mesh)
    }
  }
 useFrame(()=>{
  if(gr.current){
    gr.current.rotation.y += 0.001
  }
 })
 useEffect(()=>{
  createPano()
 },[])
return(
  <group ref={gr} position={[30,-20,0]}> 

  </group>
)

}

const ContBack = ()=>{
  const linesRef = useRef();
  const linesRef2 = useRef();
  const lineCount = 100; // Jumlah garis
  const {camera} = useThree()
  const lines = useRef(
    Array.from({ length: lineCount }, () => {
      const radius = Math.random() * 5; // Mengatur radius agar tetap di dalam box
      const angle = Math.random() * Math.PI * 2; // Sudut acak
      const length = Math.random() * 10; // Panjang acak untuk garis
  
      return [
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, -length), // Titik awal
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0), // Titik akhir
      ];
    })
  );

  const lines2 = useRef(
    Array.from({ length: lineCount }, () => {
      const radius = Math.random() * 5; // Mengatur radius agar tetap di dalam box
      const angle = Math.random() * Math.PI * 2; // Sudut acak
      return [
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, -10), // Titik awal
        new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0), // Titik akhir
      ];
    })
  );


  useFrame(() => {
    
    if (linesRef.current && linesRef.current ) {
      // Update posisi garis ke depan
      linesRef.current.position.z += 0.1;
      linesRef2.current.position.z += 0.1;
      linesRef.current.rotation.z += 0.1
      linesRef.current.rotation.z += -.1

      // Reset posisi dan buat garis baru jika sudah terlalu jauh
      if (linesRef.current.position.z > 10) {
        linesRef.current.position.z = -10; // Reset posisi
        lines.current.forEach(line => {
          line[0].z = -Math.random() * 10; // Set garis baru di belakang
          line[1].z = 0;
        });
      }

      if (linesRef2.current.position.z > 10) {
        linesRef2.current.position.z = -10; // Reset posisi
        lines2.current.forEach(line => {
          line[0].z = -Math.random() * 10; // Set garis baru di belakang
          line[1].z = 0;
        });
      }
    }
   

  });

  return (
    <>
      <Box args={[10, 10, 10]} position={[0, -100, -10]}>
        <meshBasicMaterial color="black" />
      </Box>
      <group ref={linesRef} position={[2, -100, -10]}>
        {lines.current.map((line, index) => (
          <Line
            key={index}
            points={line}
            color={line[0].z < -1 ? "rgba(255, 255, 255, 0.5)" : "white"} // Garis lebih transparan jika lebih lama
            lineWidth={line[0].z < -1 ? 1 : 2} // Ketebalan garis lama lebih tipis
          />
        ))}
      </group>
      <group   ref={linesRef2} position={[0, -100, -50]}>
        {lines2.current.map((line, index) => (
          <Line
            key={index}
            points={line}
            color={line[0].z < -1 ? "rgba(255, 255, 255, 0.5)" : "white"} // Garis lebih transparan jika lebih lama
            lineWidth={line[0].z < -1 ? 1 : 2} // Ketebalan garis lama lebih tipis
          />
        ))}
      </group>
    </>
  );
}
function Main_Canvas({active}) {
  const refCam = useRef(null);

  const checkActive = async() => {
    let pos;
    switch (active) {
      case 1:
        pos = { x: 0, y: 0, z: 6 };
        break;
      case 2:
        pos = { x: 0, y: 10, z: -3 };
        break;
      case 3:
        pos = { x: 0, y: -10, z: 3 };
        break;
      case 4:
        pos = { x: 30, y: -20, z: 2 };
        break;
      case 5:
        pos = { x: 1, y: -100, z: -2 };
        break;
      default:
        pos = { x: 0, y: 0, z: 6 }; // Posisi default jika tidak ada case yang cocok
    }
 
    if (refCam?.current) {
  
      const cam = await refCam?.current?.position; // Ambil posisi kamera
      new TWEEN.Tween(cam).to(pos,1000).start().delay(100)
    }
  };

  useEffect(() => {
    checkActive(); // Panggil fungsi saat active berubah

    
  }, [active]);

  return (
    <div>
     
        <Canvas style={{position:'absolute',width:'100%',minHeight:'100vh',
            background:'#503683',
              
              zIndex:'-10'
        }}>
        {/* <OrbitControls style={{zIndex:'1000'}} /> */}
        <PerspectiveCamera ref={refCam} makeDefault position={[0,0,6]} />  
        <ambientLight intensity={0.1} />
        <directionalLight position={[-2,5,2]} intensity={1}/>
        <Suspense fallback={null}>
        <Tween/>
          <HomeBack />
          <AboutBack />
          <LearnBack/>
          <ProBack   />
          <ContBack/>
        </Suspense>
       
        </Canvas>
    </div>
  )
}

export default Main_Canvas