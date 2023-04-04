import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import imageslide from '../Data/imagedata'
import campeignImages from '../Data/campeignImages.js'
import Link from 'next/link';
import React, { useState } from 'react'
import { PartialClaimConditionInputSchema } from '@thirdweb-dev/sdk'
import { useRouter } from 'next/router'



export default function Home() {
   const [currentslide, setcurrentslide]=useState(0);
   const [textshow, settextshow]=useState(false);
   const [name, setName] = useState('');
   const [subject, setSubject] = useState('');
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');
const router= useRouter()
   const handleEnquiry = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let res = await fetch("http://localhost:3000/api/enquiry", {
      method: "POST",
      body: JSON.stringify({
         name:name,
        email: email,
        subject: subject,
        message:message,
      }),
    });
    res = await res.json();
  if(res.status===200){
    alert("Enquiry Email sent successfully!!")
    return router.push('/')
    }
    }


  return (
    <div>
        <Header />

        {/*  {imageslide?.map (data  =>(  */}
        <div className='relative mx-auto '>

           {/*   <div style={bgImageStyle}></div> */}

           <Image
              src={imageslide[currentslide].url}
              alt='Bgimage'
              width={1080}
              height={10}
              onClick={() => currentslide + 1 < 3 ? setcurrentslide(currentslide + 1) : setcurrentslide(0)}
              className=' mx-auto grayscale  rounded ' />

           <p className=' text-blue-400 text-4xl font-bold absolute xl:top-16 sm:top-12  2xl:left-1/4 xl:left-96 lg:left-44 md:left-32 sm:left-16 font-serif '>New Hope for Future </p>
           <p className=' text-green-400 text-xl mt-3 font-bold absolute xl:top-24 sm:top-20  2xl:left-1/4 xl:left-96 lg:left-44 md:left-32 sm:left-16 max-w-2xl'>
              We seek out for world changers around the globe and equip them with transperant and trustable technologies for unique purpose.
           </p>

           <Link href='/signup'>
              <button
                 className='h-10 w-24 text-white font-semibold bg-blue-400 rounded-full  hover:bg-blue-200 absolute bottom-16 2xl:right-1/4 xl:right-96 lg:right-40 md:right-28 sm:right-10 '
              >Register</button>
           </Link>
        </div>

        <div
           //  className=' flex flex-row xl:ml-96 lg:ml-32 md:ml-24 sm:ml-8 pt-24 pb-12 max-w-5xl '
           className=' grid  place-items-center  max-w-5xl xl:ml-96 lg:ml-32 sm:ml-2 pt-24'
        >
           <div className='flex flex-row'>
              <Image
                 src={'/assets/acheivement.jpg'}
                 alt='Bgimage'
                 width={800}
                 height={10}
                 className=' rounded ' />
              <div
              >
                 <h1 className=' text-4xl font-bold '>How we're making a <span className='text-rose-400 font-serif'>difference</span></h1>
                 <p className='py-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada accumsan pellentesque. it amet, consectetur adipiscing elit. Nunc
                 </p>
                 {textshow ?
                    <p className='py-4 '>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc malesuada accumsan pellentesque.
                       Nam tempor, nunc non suscipit dignissim, sem ligula m
                       aximus diam, quis condimentum ante tortor at sem. Sed rutrum lorem in
                       diam hendrerit semper</p> : ''}
                 {/* <p className=' text-green-200 text-xl mt-3 font-bold absolute xl:top-24 sm:top-20  2xl:left-1/4 xl:left-96 lg:left-44 md:left-32 sm:left-16 max-w-2xl'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis sem quis orci por
                    ta lacinia eget ac enim. Curab
          itur ullamcorper tincidunt purus, ac interdum urna convallis in. Nulla euismod finibus dui, at biben
                dum dolor scelerisque vitae. Praesent faucibus nulla in egestas tincidunt</p> */}
                 {textshow ? '' :
                    <button className='h-10 w-32  text-black font-semibold rounded-full border-black border-2  hover:bg-gray-200' onClick={() => { settextshow(true) } }>
                       Show more </button>}
              </div>
           </div>
        </div>


     <section className=' bg-[#f2f2fc] pt-12 pb-24'>
           <div className=' grid grid-col place-items-center'>
              <text className='text-5xl max-w-xl font-[700] font-serif '>Introduce our featured </text>
              <text className='text-5xl max-w-xl font-[700] font-serif '> Non profit Causes</text>
              <div className=''>

                 <div className='flex flex-row pt-12'>

                    {/* {campeignImages?.map(data =>{  */}
                    <div className='max-w-sm ml-5 rounded-lg border-2 border-slate-300'>
                       <div className='overflow-hidden'>
                          <Image src={'/assets/acheivement.jpg'} alt='img' height={10} width={380} className='hover:scale-105 transition-all duration-105 ease-out' />
                          <div className=' h-8 w-24 p-1 bg-[#00A693] text-white text-center font-medium rounded-full absolute ml-2 -mt-4  '>
                             Health
                          </div>
                       </div>
                       <div>
                          <h1 className='text-xl font-bold pl-4 pt-9'>Health text</h1>
                          <p className='p-4'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt 
                          mi a elit mattis, nec sollicitudin neque posuere. Praesent at ante ut turpis imperdiet lacinia. 
                         </p>
                       </div>
                    </div>

                    <div className='max-w-sm ml-5 rounded-lg border-2 border-slate-200'>
                       <div className=' overflow-hidden'>
                          <Image src={'/assets/acheivement.jpg'} alt='img' height={10} width={380}  className='hover:scale-105 transition-all duration-105 ease-out'/>
                          <div className='h-8 w-24 p-1 bg-[#00A693] text-white text-center font-medium rounded-full absolute ml-2 -mt-4'  >
                             Food
                          </div>
                       </div>
                       <div>
                       <h1 className='text-xl font-bold pl-4 pt-9'>Food text</h1>
                          <p className='p-4 '> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt mi a elit mattis, nec 
                          sollicitudin neque posuere. Praesent at ante ut turpis imperdiet lacinia.  </p>
                       </div>
                    </div>

                    <div className='max-w-sm ml-5 rounded-lg border-2 border-slate-200'>
                       <div className='overflow-hidden'>
                          <Image src={'/assets/acheivement.jpg'} alt='img' height={10} width={380}  className='hover:scale-105 transition-all duration-105 ease-out' />
                          <div className='px-2 h-8 w-24 p-1 bg-[#00A693] text-white text-center font-medium rounded-full absolute ml-2 -mt-4'>
                             Education
                          </div>
                       </div>
                       <div className='px-2'>
                       <h1 className='text-xl font-bold pl-4 pt-9'>Education text</h1>
                          <p className='p-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincid
                          unt mi a elit mattis, nec sollicitudin neque posuere. Praesent at ante ut turpis imperdiet lacinia.  </p>
                       </div>
                    </div>


                 </div>
              </div>
           </div>
        </section>

 

 <section className='bg-[#f2f2fc] pt-12 pb-24'>
           <div className=' grid grid-col place-items-center'>
              <text className='text-5xl max-w-xl font-[700] font-serif '>What people Say About  </text>
              <text className='text-5xl max-w-xl font-[700] font-serif '> Our Company</text>
              <div>

                 <div className='flex flex-row pt-12 transition-x-10'>

                    {/* {campeignImages?.map(data =>{  */}
                    <div className='max-w-sm ml-5 rounded-lg border border-black bg-white hover:scale-105 transition-all duration-105 ease-out'>
                       <div className='p-4'>
                          <p className='leading-7 italic'> " This is a  Badge issued by IBM for successful completion of the digital course 'What is Data Scie
                           nce'.Course was accessed through COURSERA.his is a  Badge issued by IBM for successful completion his is a  Badge issued by I
                           BM for successful completion "
                         </p>
                       </div>
                       <div className='flex flex-row pt-8 pb-4'>
                          <Image src={'/assets/acheivement.jpg'} alt='img' height={10} width={70} className='rounded-full' />
                          <div className='px-2'>
                          <p className='text-lg font-bold'>Alen Tom</p>
                           <p className='text-md text-green-300 font-medium'>Designation</p>
                          </div>
                       </div>
                    </div>

                    <div className='max-w-sm ml-5 rounded-lg border border-black bg-white  hover:scale-105 transition-all duration-105 ease-out'>
                       <div className='p-4'>
                          <p className='leading-7 italic'> " This is a  Badge issued by IBM for successful completion of the digital course 'What is Data Science'.
                          Course was accessed through COURSERA. his is a  Badge issued by IBM for successful completion his is a  Badge issued by IBM f
                          or successful completion "</p>
                       </div>
                       <div className='flex flex-row pt-8 pb-4'>
                          <Image src={'/assets/acheivement.jpg'} alt='img' height={10} width={70}  />
                          <div className='px-2'>
                          <p className='text-lg font-bold'>Sachin  Stanly</p>
                           <p className='text-md text-green-300 font-medium'>Designation</p> 
                          </div>
                       </div>
                    </div>

                    <div className='max-w-sm ml-5 rounded-lg border border-black bg-white  hover:scale-105 transition-all duration-105 ease-out'>
                       <div className='p-4'>
                          <p className='leading-7 italic'> " This is a  Badge issued by IBM for successful completion of the digital course 'What is Data Science'.
                          Course was accessed through COURSERA.his is a  Badge issued by IBM for successful completion his is a  Badge issued by IBM for succ
                          essful completion "  </p>
                       </div>
                       <div className='flex flex-row pt-8 pb-4' >
                          <Image src={'/assets/acheivement.jpg'} alt='img' height={10} width={70}  />
                          <div className='px-2'>
                           <p className='text-lg font-bold'>Abin Abraham</p>
                           <p className='text-md text-green-300 font-medium'>Designation</p>
                          </div>
                       </div>
                    </div>


                 </div>
              </div>
           </div>
        </section>



      <section className='bg-[#f2f2fc] pt-12 pb-24'>
         <div className='flex flex-row justify-center'>
         
      <div >
         <p className=' text-green-400 font-semibold font-serif'>CALL TO ACTION</p>
         <h1 className='text-4xl font-bold pt-3 font-serif'>Let's Create Something</h1>
         <h1 className='text-4xl font-bold font-serif'>Great Together !</h1>
			<form className='pt-8' onSubmit={handleEnquiry} method="post">
				<div>
					<div className='mt-4' >
						<div className=''>
						<input className='h-12  w-64 pl-3 shadow-md' type="text" name="name" id="name" onChange={(event) => setName(event.target.value)} placeholder="Name*" ></input>
						</div>
					</div>
					<div className='mt-4'>
						<div >
						<input className='h-12 w-64 pl-3 shadow-md' type="email"  name="email" id="email" onChange={(event) => setEmail(event.target.value)} placeholder="Email*" ></input>
						</div>
					</div>
				</div>
				<div >
					<div className='mt-4' >
						<div className='flex' >
						<input className='h-12  w-64 pl-3 shadow-md' type="text"  name="Subject" id="Subject" onChange={(event) => setSubject(event.target.value)}placeholder="Subject*" ></input>
						</div>
					</div>
				</div>
				<div >
					<div className='mt-4'>
						<div >
						<textarea className='h-32 w-72  pt-3 pl-3 shadow-md ' name="message" id="message" onChange={(event) => setMessage(event.target.value)} placeholder="Your message.." ></textarea>
						</div>
					</div>
				</div>
				<div className='pt-6' >
					<div className='bg-blue-400 pt-1 h-8 w-24 rounded-full text-center text-white font-bold hover:scale-105 transition-all ease-out' >
						<button  type="submit" >Send </button>
					</div>
				</div>
			</form>
		</div>
      <Image src={'/assets/acheivement.jpg'} alt='img' height={10} width={450}  className='pl-12' />
      </div>
      </section>

     <section className=' pt-24 pb-12 flex justify-center bg-[#f2f2fc]'>
      <div className='flex '>

      {/* <div className=' bg-gray-600 rounded absolute w-3/4'>
         <div className='flex flex-col'>
         <Image width={100} height={10} alt="img" src={'/assets/logo.png'}  className=''/>
         <div>alen</div>
         </div> */}
         
       {/* <div className='flex flex-col rounded px-16 py-6 bg-orange-500 max-w-3xl'>
         <h1 className=' text-center text-3xl font-bold text-white'>  Want to be a Volunteer??</h1>
         <div className='flex flex-row'>
          <p className=' text-center text-lg font-thin  text-white pt-3 '>Fill the form ASAP . We will reach you out shortly!!
           AP . We will reach you out shortly!!  We will reach you out  We will reach you out  We will reach you out</p> 
          <button className=' text-center text-white w-32 h-8 ml-2 mt-4 px-2 rounded-full transition-all hover:scale-105 border-2 border-white'>Volunteer</button>
          </div>
       </div> */}
       
       <div className=' bg-gray-600 rounded '>

       <div className='flex flex-col -mt-24 sm:ml-28 md:ml-40 lg:ml-52 xl:ml-96  rounded px-16 py-6 bg-orange-500 w-2/4 '>
         <h1 className=' text-center text-3xl font-bold text-white'>  Want to be a Volunteer??</h1>
         <div className='flex flex-row'>
          <p className=' text-center text-lg font-thin  text-white pt-3 '>Fill the form ASAP . We will reach you out shortly!!
           AP . We will reach you out shortly!!  We will reach you out  We will reach you out  We will reach you out</p> <Link href={'/volunteer'}>
          <button  className=' text-center text-white w-32 h-8 ml-2 mt-4 px-2 rounded-full transition-all hover:scale-105 border-2 border-white'>Volunteer</button>
          </Link>
          </div>
       </div>

<div className='flex flex-row '>
         <div className='flex flex-col mt-12 pb-3 pl-96'>
         <Image width={100} height={10} alt="img" src={'/assets/logo.png'}  className=''/>
         <div className='my-8 w-64  text-white leading-7'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </div>
          <div className='w-64 text-white leading-7'> Lorem Ipsum has been the industry's standard dummy text ever since</div>
         </div> 

         <div className='p-20'>
            <h1 className='text-xl font-bold font-serif text-white '>Main Menu</h1>
            <p className='text-white pt-4'> Home</p>
            <p className='text-white pt-3'>About us</p>
            <p className='text-white pt-3'>Page</p>
            <p className='text-white pt-3'>Donations</p>
            <p className='text-white pt-3'>Blog</p>
         </div>

         <div className='p-20'>
            <h1 className='text-xl font-bold font-serif text-white '>Non Profits</h1>
            <p className='text-white pt-4'> Food</p>
            <p className='text-white pt-3'>Water</p>
            <p className='text-white pt-3'>Medical</p>
            <p className='text-white pt-3'>Volunteering</p>
         </div>
</div>
         
         <hr/>
         <div className=' flex justify-center py-3 text-white'>copyright @2023 Tcare . All right reserved.</div>
       </div>
       

         </div>
       
     </section>
      </div>
      
  
  )
}
