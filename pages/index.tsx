import Image from 'next/image'
import Header from '../components/Header'
import imageslide from '../Data/imagedata'
import Link from 'next/link';
import React, { useState } from 'react'
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
      let res = await fetch("https://web3-crowd-funding.vercel.app/api/enquiry", {
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

      <div className='relative mx-auto'>
           <Image
              src={imageslide[currentslide].url}
			  width={1080} 
			  height={500}
              alt='Bgimage'
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
                 <p className='py-4 text-gray-600 font-semibold'>Nowadays people are becoming voracious to contribute to the society but usually end up in the wrong hands. We are here to make sure that your contribution reaches the right hands.
                 </p>
                 {textshow ?
                    <p className='py-4 text-gray-600 font-semibold'>To increase the transparency and trustability, we came up with the new technology of blockchain .This application provides
                        trust b/w the users and donors. This help reduce the corruption and increase the efficiency of the donation process.</p> : ''}
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
                    <div className='max-w-sm ml-5 rounded-lg border-2 border-slate-300'>
                       <div className='overflow-hidden'>
                          <Image src={'/assets/health2.jpg'} alt='img' height={10} width={380} className='hover:scale-105 transition-all duration-105 ease-out' />
                          <div className=' h-8 w-24 p-1 bg-[#00A693] text-white text-center font-medium rounded-full absolute ml-2 -mt-4  '>
                            Health
                          </div>
                       </div>
                       <div>
                          <h1 className='text-xl font-bold pl-4 pt-9'>Health care</h1>
                          <p className='p-4'> Providing a helping hand to financially support those who are unable to afford day to day
                          medical expenses which range from several thousands to lakhs. 
                         </p>
                       </div>
                    </div>

                    <div className='max-w-sm ml-5 rounded-lg border-2 border-slate-200'>
                       <div className=' overflow-hidden'>
                          <Image src={'/assets/food2.jpg'} alt='img' height={10} width={380}  className='hover:scale-105 transition-all duration-105 ease-out'/>
                          <div className='h-8 w-24 p-1 bg-[#00A693] text-white text-center font-medium rounded-full absolute ml-2 -mt-4'  >
                             Food
                          </div>
                       </div>
                       <div>
                       <h1 className='text-xl font-bold pl-4 pt-9'>Feeding the hunger</h1>
                          <p className='p-4 '> As per the studies conducted in 2019-2020 around 10% of world population suffer from under nourishment .
                          It will be a great platform to support them.  </p>
                       </div>
                    </div>

                    <div className='max-w-sm ml-5 rounded-lg border-2 border-slate-200'>
                       <div className='overflow-hidden'>
                          <Image src={'/assets/education2.jpg'} alt='img' height={10} width={380}  className='hover:scale-105 transition-all duration-105 ease-out' />
                          <div className='px-2 h-8 w-24 p-1 bg-[#00A693] text-white text-center font-medium rounded-full absolute ml-2 -mt-4'>
                             Education
                          </div>
                       </div>
                       <div className='px-2'>
                       <h1 className='text-xl font-bold pl-4 pt-9'>Education to Everyone</h1>
                          <p className='p-4'>Education and knowledge are the key to everything. Through education we could 
                          empower the needies . We focus on developing of communities through quality education. </p>
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
                    <div className='max-w-sm ml-5 rounded-lg border border-black bg-white hover:scale-105 transition-all duration-105 ease-out'>
                       <div className='p-4'>
                          <p className='leading-7 italic'>" Decentralized behaviour of this application  cuts down the role of a third party hence reducing 
                            a lot of frauds prevailing among such platforms.This actually  helps in increasing the efficiency and trust between donators and 
                            the needies since it has no mediators. "
                         </p>
                       </div>
                       <div className='flex flex-row pt-8 pb-4'>
                          <Image src={'/assets/steve.jpg'} alt='img' height={10} width={70} className='ml-2 rounded-full' />
                          <div className='px-2'>
                          <p className='text-lg font-bold'>Steve Harvy</p>
                           <p className='text-md text-green-300 font-medium'>Donator</p>
                          </div>
                       </div>
                    </div>

                    <div className='max-w-sm ml-5 rounded-lg border border-black bg-white  hover:scale-105 transition-all duration-105 ease-out'>
                       <div className='p-4'>
                          <p className='leading-7 italic'> " This platform really help to directing charity funds in the right amount to the right cause, and helping deserved & needy 
                          without loosing a  single penny to the middlemen. No excess amount will not be transfered to the needy person in other words cannot make transaction after limit. 
                          "</p>
                       </div>
                       <div className='flex flex-row pt-8 pb-4'>
                          <Image src={'/assets/jofri.jpg'} alt='img' height={10} width={70} className='ml-2 rounded-full' />
                          <div className='px-2'>
                          <p className='text-lg font-bold'>Jofri Alex</p>
                           <p className='text-md text-green-300 font-medium'>Donator</p> 
                          </div>
                       </div>
                    </div>

                    <div className='max-w-sm ml-5 rounded-lg border border-black bg-white  hover:scale-105 transition-all duration-105 ease-out'>
                       <div className='p-4'>
                          <p className='leading-7 italic'> " This is a very innovative charity programme which had brought back hope to humanity, since
                          it had gained trust of donators as well as needies such as me myself. I think decentralized applications has a huge potential in tech world.
                           I bless this venture all the success in the future.
                           " </p>
                       </div>
                       <div className='flex flex-row pt-8 pb-4' >
                          <Image src={'/assets/priya.jpg'} alt='img' height={10} width={70} className='ml-2 rounded-full' />
                          <div className='px-2'>
                           <p className='text-lg font-bold'>Priya Agarval</p>
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
       <div className=' bg-gray-600 rounded '>

       <div className='flex flex-col -mt-24 sm:ml-28 md:ml-40 lg:ml-52 xl:ml-96  rounded px-16 py-6 bg-orange-500 w-2/4 '>
         <h1 className=' text-center text-3xl font-bold text-white'>  Want to be a Volunteer??</h1>
         <div className='flex flex-row'>
          <p className=' text-center text-lg font-thin  text-white pt-3 '>In the path towards building transparent platform
           we would like to take like-minded people with us. Wanna join as volunteer?? fill out the form!!</p> <Link href={'/volunteer'}>
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
