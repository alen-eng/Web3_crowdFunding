import React, { FormEvent, useState } from 'react';
import { useAddress, useContract , useContractWrite } from '@thirdweb-dev/react';
import CampaignHeader from '../components/CampaignHeader';
import { useRouter } from 'next/router';
type Props = {}

function addItems({}: Props) {
  const address= useAddress();
  const router= useRouter();
  const [preview,setPreview]= useState<string>();
  const [image, setImage]=useState<File>();
  const {contract}= useContract (
 process.env.NEXT_PUBLIC_CROWDFUND_COLLECTION_CONTRACT,
 "nft-collection"
  );
  const { mutateAsync: grantRole, isLoading } = useContractWrite(contract, "grantRole")
  const mintNft= async (e : FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   if(!contract || !address) return;

   if(!image){
    alert("Please add an Image!!");
    return;
   }
   const target= e.target as typeof e.target & {
    name : {value: string};
    description : {value: string};
    address: {value:string}
   }
   const metadata= {
    name : target.name.value,
    description : target.description.value,
    address : target.address.value,
    image : image,
   }
      try{
           const data = await grantRole(['0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6' as any ,address]);
           console.log(data);
          const tx=await contract.mintTo(address, metadata);
          const receipt= tx.receipt;
          const tokenId = tx.id;
          const nft = await tx.data();
          console.log(receipt, tokenId, nft);
          router.push('/');
      }
      catch(error)
      { 
        console.log(error)

      }

  };
  return (
    <div >
    <CampaignHeader/>
        <main className='max-w-6xl mx-auto p-10 border'>
         <h1 className='text-4xl font-bold'>Create request</h1>
         <h2 className='text-xl font-semibold pt-5'>Item</h2>
         <p className='pb-5'>
         Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
         Lorem Ipsum is simply dummy text. </p>
        
        <div className='flex flex-col justify-center items-center md:flex-row md:space-x-5 pt-5'>
          <img className='border w-80 h-80 object-contain' 
          src={preview || 'https://links.papareact.com/ucj'}
           alt=''/>
          
          <form onSubmit={mintNft} className='flex flex-col flex-1 p-2 space-y-2 '>
        <label className='font-light'> Campaign Name</label>
        <input 
        className='formField' 
        placeholder='Name of Camapign...' 
        type='text'
        name='name'
        id='name'
        />
        <label className='font-light'> Description</label>
        <input
         className='formField'
          placeholder='Description for Campaign...'
           type='text'
           name='description'
           id='description'
           />
         <label className='font-light'> Wallet Address</label>
         <input
         className='formField'
          placeholder='Wallet address...'
           type='string'
           name='address'
           id='address'
           />
        <label className='font-light'>Image of Item</label>
            <input type='file'
             onChange={(e) =>{
              if(e.target.files?.[0]){
                setPreview(URL.createObjectURL(e.target.files[0]));
                setImage(e.target.files[0]);
              }
            }}/>
            <button type='submit' className='bg-blue-600 font-bold text-white rounded-full py-4 px-10 w-56 md:mt-auto mx-auto ml-auto'>Add/mint item</button>
          </form>
        </div>
        </main>
    </div>
  )
}

export default addItems;
