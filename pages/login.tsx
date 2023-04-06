
import Head from 'next/head'
import link from 'next/link';
import { useRouter } from 'next/router';
import { NextRequest, NextResponse } from 'next/server';
import { useState } from 'react';
//import {Router} from 'next/router';
import{ FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaRegEnvelopeOpen,
} from 'react-icons/fa';
import { FaLockOpen } from 'react-icons/fa';


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let res = await fetch("https://web3-crowd-funding.vercel.app/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  res = await res.json();
if(res.status===200){
  alert("Login Successful!!")
  return router.push('/campaigns')
  }
else if(res.status===402){
 alert("Wrong password!!")
 return router.push('/login')
}
else if(res.status===401){
  alert("User not found")
  return router.push('/')
  }
  else{
    alert("Something wrong!!")
    return router.push('/login')
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
                Sign in to Account
                </h2>
              <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
              <div className="flex justify-center my-2">
                <a href="a" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaFacebookF className="text-sm" />
                </a>
                <a href="a" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaLinkedinIn className="text-sm" />
                </a>
                <a href="a" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                  <FaGoogle className="text-sm" />
                </a>
                 </div>{/* Social Login section*/}
                 <p className="text-gray-400 my-3">or use yor email account</p>
                 <form onSubmit={handleLogin} method='post'>
                 <div className="flex flex-col items-center">
                  <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                    <FaRegEnvelopeOpen className="text-gray-500 m-2" />
                    <input type="email" name="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} className="pl-2 outline-none text-sm
                    flex-1" />
                    </div>

                    <div className="bg-gray-200 w-64 p-2 flex items-center mb-3">
                    <FaLockOpen className="text-gray-500 m-2" />
                    <input type="password" name="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} className="pl-2 outline-none text-sm
                    flex-1" />
                    </div>
    
                    <div className="flex justify-between w-64 mb-5">
                      <label className="flex items-center text-x5"><input type="checkbox" name="Remeber"
                      className="mr-1"/>Remeber me </label>
                      <a href="/forgot" className="text-x5 underline">Forgot Password</a>
                    </div>
                    <button
                    type='submit'
                     className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500
                     hover:text-white"
                     >
                      Sign In    
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
            <a
             href="/signup" 
             className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white
             hover:text-green-500"
             >
              Sign Up
              </a>
            </div>
            {/* sign up section */}   
            </div>
           </main>
          </div>
           
  )
  } 
  

      

       
 
      
            

