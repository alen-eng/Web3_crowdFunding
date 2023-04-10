import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Volunteer() {
  const router=useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleVolunteer = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    let res = await fetch("https://web3-crowd-funding.vercel.app/api/volunteer", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      address: address,
      number: number,
      message: message,
    }),
  });
  res = await res.json();
  if(res.status===200){
    alert("Email sent successfully!!")
    return router.push('/')
  }
  else
  alert("Something wrong!!")
  return router.push('/')
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100" > 
     
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">     
           <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
           <div className="w-3/5 p-5">
             <div className="text-left text-xl font-bold text-green-300">
                TCare
             </div>
             <div className="py-10">
              <h2 className="text-3xl font-b0ld text-green-500 mb-2">
                Volunteer 
                </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
                 <form onSubmit={handleVolunteer} method='post' >
                 <div className="flex flex-col items-center">
                 
                 <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                    
                    <input required type="text" name="name" placeholder="Name" onChange={(event) => setName(event.target.value)} className=" pl-2 outline-none text-sm
                    flex-1" />
                    </div>
                 <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                    
                    <input required type="email" name="email" placeholder="email" onChange={(event) => setEmail(event.target.value)} className=" pl-2 outline-none text-sm
                    flex-1" />
                    </div>
                    <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">

                    <input required type="text" name="address" placeholder="Address" onChange={(event) => setAddress(event.target.value)} className=" pl-2 outline-none text-sm
                    flex-1" />
                    </div>
                    <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                  
                    <input required type="number" name="number" placeholder="Mob. no" onChange={(event) => setNumber(event.target.value)} className=" pl-2 outline-none text-sm
                    flex-1" />
                    </div>
                    <div className="bg-gray-200 h-32 w-64 p-2 flex mb-3">

                  <input required type="message" name="message" placeholder="Message" onChange={(event) => setMessage(event.target.value)} className=" pl-2 pb-16 h-28 outline-none text-sm
                  flex-1" />
                  </div>
                    <button
                     type='submit' 
                     className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500
                     hover:text-white"
                     >
                      Submit   
                      </button>
                 </div>
                 </form>
              </div>       
          </div>
           <div className="w-3/5 bg-[url('/assets/education.jpg')]  text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello,Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Fill up personal information and start journey with us.
              </p>
            </div>  
            </div>
           </main>
          </div>
           
  )
  } 
  

      

       
 
      
            

