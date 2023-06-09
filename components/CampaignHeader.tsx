import React from 'react'
import { useAddress , useDisconnect ,useContract,useContractRead, useMetamask } from '@thirdweb-dev/react';
import Link from 'next/link';
import {ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
type Props = {}

function Header({}: Props) {
    const connectwithMetamask = useMetamask();
    const disconnect = useDisconnect();
    const address = useAddress();
    const {contract}= useContract (
      process.env.NEXT_PUBLIC_CROWDFUND_COLLECTION_CONTRACT,
      "nft-collection"
       );  
       const { data, isLoading } = useContractRead(contract, "hasRole", ['0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6' as any, address as string]);
          if(data){ console.log(data) }
       const handleRole = async ()=> {
          if(address==null) return alert("Please connect your wallet")
          let res = await fetch("https://web3-crowd-funding.vercel.app/api/role", {
          method: "POST",
          body: JSON.stringify({
            address: address,
          }),
        });
        res = await res.json();
        if(res.status==201){
          alert("Role request added successfully")
        }
          else if(res.status===400){
           alert("Please connect your wallet")
          }
          else if(res.status===408){
            alert("Role request already added. Don't do it again!")
           }
        else{
          alert("Role request failed")
        }
        }
  return (
    <div className='max-w-6xl mx-auto'>
    <nav className='flex justify-between mt-2'>
        <div className='flex items-center space-x-2 text-sm'>
            { address ? (
                <button onClick={disconnect} className='connectWalletBtn'> Hi, {address.slice(0,5)+ "...."+ address.slice(-6)} </button>
             ) : (
            <button onClick={()=>{connectwithMetamask()}} className='connectWalletBtn'>Connect your wallet </button>
            )}

          <p className='hidden md:inline-flex text-green-600 text-lg font-bold font-serif'> Lighten </p>
           <p className='hidden md:inline-flex font-semibold text-lg font-serif text-orange-300'> the darkened lives </p> 
        </div>

      <div className='flex items-center space-x-6 text-sm'>
        <p className='headerLink font-semibold'>food</p>
        <p className='headerLink font-semibold'>Health</p>
        <p className='headerLink font-semibold'>Education</p>
        {data==true ?(
        <Link href='/campaignRequest'>
        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer'>Campaign request</button>
        </Link> ) : (
        <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer' onClick={handleRole}>Request Access</button>
         ) }
      
      </div>
      </nav>
      <hr className='mt-2'/>
      <section className='flex items-center space-x-2 py-5'>
        <div className='h-16 w-16 sm:w-28 md:w-44 cursor-pointer flex-shrink-0'>
          <Link href='/'>
            <Image className='w-full h-full object-contain '
            alt='charity_logo'
            src='/assets/logo.png'
            width={100}
            height={100}/>
          </Link>
        </div>

        <button className='hidden lg:flex items-center space-x-2 w-20'>
          <p className='text-gray-600 text-sm'>Search Category</p>
            <ChevronDownIcon className='h-4 flex-shrink-0'/>
        </button>
        <div className='flex items-center space-x-2 px-2 md:px-5 py-2 border-black border-2 flex-1'>
          <MagnifyingGlassIcon className='w-5 text-gray-400 '/>
          <input className='flex-1 outline-none' placeholder='Search for Anything' type='text'/>
        </div>
        <button className='hidden sm:inline bg-blue-600 text-white px-5 md:px-10 py-2 border-2 border-blue-600'>Search</button>
        {address === process.env.NEXT_PUBLIC_ROOT_USER ? (
        <Link href='/createCampaign' >
        <button className='border-2 border-blue-600 px-5 md:px-10 py-2 text-blue-600 hover:bg-blue-600/50 hover:text-white cursor-pointer'>Create campaign</button>
        </Link>  ) : ''
                }
      </section>
      <hr/>
    </div>
  );
}

export default Header;
