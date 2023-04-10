import React from 'react'
import Link from 'next/link';
 import {DevicePhoneMobileIcon} from '@heroicons/react/24/solid';
import Image from 'next/image';
type Props = {}

function Header({}: Props) {
    
  return (
    <div className='max-w-7xl mx-auto py-2 pl-16'>
      
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
    </div>
  );
}

export default Header;
