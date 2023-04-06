
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useState } from 'react';
import{ FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelopeOpen,
} from 'react-icons/fa';
import { FaLockOpen } from 'react-icons/fa';
export default function Forgot() {
  const [email, setEmail] = useState('');
 const router = useRouter();
  const handleForgot = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let res = await fetch("https://web3-crowd-funding.vercel.app/api/auth/forgot", {
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
  });
  res = await res.json();
if(res.status===200){
  alert("User Exist!!")
  return router.push('/')
  }
else if(res.status===401){
  alert("Wrong Email!!")
  return router.push('/forgot')
  }
  else{
    alert("Something wrong!!")
    return router.push('/')
  }
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
                Sign Up 
                </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                
                 </div>
                 <p className="text-gray-400 my-3">Enter logged Email</p>
                 <form onSubmit={handleForgot} method='post' >
                 <div className="flex flex-col items-center">
                  <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelopeOpen className="text-gray-500 m-2" />
                    <input type="email" name="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} className="pl-2 outline-none text-sm
                    flex-1" />
                    </div>
                    <button
                     type='submit' 
                     className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500
                     hover:text-white"
                     >
                      Send   
                      </button>
                 </div>
              </form>
              </div>       
          </div>
            {/* sign in section */}
           <div className="w-3/5 bg-[url('/assets/education.jpg')]  text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello,Friend!</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">
              Fill up personal information and start journey with us.
              </p>
            {/* <a
             href="/signup" 
             className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white
             hover:text-green-500"
             >
              Sign Up
              </a> */}
            </div>
            {/* sign up section */}   
            </div>
           </main>
          </div>
           
  )
  } 
  

      

       
 
      
            

