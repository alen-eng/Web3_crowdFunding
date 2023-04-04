import React from 'react'
import { useAddress , useDisconnect , useMetamask } from '@thirdweb-dev/react';
import Link from 'next/link';
 import {DevicePhoneMobileIcon} from '@heroicons/react/24/solid';
// import   {BellIcon, ShoppingCartIcon} from  '@heroicons/react/24/outline';
import logo from './assets/logo.png';
import Image from 'next/image';
type Props = {}

function Header({}: Props) {
    // const connectwithMetamask = useMetamask();
    // const disconnect = useDisconnect();
    // const address = useAddress();
    
  return (
    <div className='max-w-7xl mx-auto py-2 pl-16'>
    {/* <nav className='flex justify-between mt-2'>
      </nav> */}
      
      <section className='flex items-center space-x-2 py-3'>
        <div className='h-16 w-16 xl:mr-32 sm:w-28 mr-8 md:w-44 md:mr-16 cursor-pointer flex-shrink-0'>
          <Link href='/'>
            <Image
            src='/assets/logo.png'
            className='w-full h-full object-contain ml-8 '
            alt='thirdweb_logo'
            width={100}
            height={100}/>
          </Link>
        </div>
         <div className='flex flex-row space-x-8'>
          <p className='text-gray-800 text-lg font-semibold'>Home</p>
          <p className='text-gray-800 text-lg font-semibold'>About Us</p>
          <p className='hidden md:linline text-gray-800 text-lg font-semibold'>Causes</p>
          <p className='hidden md:inline text-gray-800 text-lg font-semibold'>Page</p>
          <p className='text-gray-800 text-lg font-semibold'>Donation</p>
          <p className='hidden md:inline text-gray-800 text-lg font-semibold '>Blog</p>
          </div>
          <div className='flex flex-row px-16'>
          <DevicePhoneMobileIcon className='h-6 w-6  hidden lg:inline mt-2  '/>
          <p className='hidden lg:inline mt-2 '>+161 94 32 141</p>
           <Link href='/login' className='lg:px-16 '>
              <button className='w-24 h-10  text-blue-500 font-medium border-4 border-blue-500 rounded-full hover:text-white hover:bg-gray-400'>Login</button>
           </Link>
          </div>
      </section>
      
      {/* <section className='flex py-3 space-x-6 text-xs md:text-sm whitespace-nowrap justify-center px-6'>
         <p className='link'>Home</p>
        <p className='link'>Electronics</p>
        <p className='link'>Computers</p>
        <p className='link hidden sm:inline'>Video Games</p>
        <p className='link hidden sm:inline'>Home & Garden</p>
        <p className='link hidden md:inline'>Health & Beauty</p>
        <p className='link hidden lg:inline'>Collectibles & Art</p>
        <p className='link hidden lg:inline'>Books</p>
        <p className='link hidden lg:inline'>Music</p>
        <p className='link hidden xl:inline'>Deals</p>
        <p className='link hidden xl:inline'>Other</p>
        <p className='link'>More</p> 
      </section> */}
    </div>
  );
}

export default Header;