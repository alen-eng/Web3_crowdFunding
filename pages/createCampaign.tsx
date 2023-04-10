import React, { FormEvent, useState } from 'react'
import CampaignHeader from '../components/CampaignHeader'
import { 
    useAddress,
    useContract,
    MediaRenderer,
    useNetwork,
    useNetworkMismatch,
    useNFTs,
} from '@thirdweb-dev/react'
import { NFT } from '@thirdweb-dev/sdk';
import network from '../utils/network';
import { useRouter } from 'next/router';

type Props = {}

function createCampaign({}: Props) {

    const address= useAddress();
    const router = useRouter();
    const {contract}= useContract(process.env.NEXT_PUBLIC_CROWDFUNDING_CONTRACT);
    
    const [selectedNFT , setselectedNFT]= useState<NFT>();
    const {contract: collectionContract}= useContract(
        process.env.NEXT_PUBLIC_CROWDFUND_COLLECTION_CONTRACT,
        'nft-collection'
    );
  const { data, isLoading:loading, error } = useNFTs(collectionContract);
 
  const networkMismatch = useNetworkMismatch();
  const [,switchNetwork]= useNetwork();
   
const handleCreateCampaign= async (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
if(networkMismatch){
    switchNetwork  && switchNetwork(network);
    return;
}

if(!selectedNFT) return;

const target= e.target as typeof e.target & {
    elements: {Address:{value:string}, Title:{value:string}, Description:{value:string}, 
               Target:{value: number}, Deadline:{value: string},
            };
        };
    
      await contract?.call("createCampaign", [selectedNFT.metadata.address,target.elements.Title.value ,
            target.elements.Description.value, target.elements.Target.value,new Date(target.elements.Deadline.value).getTime() ,selectedNFT.metadata.image], )

};
  return (
    <div>
        <CampaignHeader/>
  
        <main className='max-w-6xl mx-auto p-10 pt-2'>
            <h1 className='text-4xl font-bold'>List a Camapaign</h1>
            <h2 className='text-xl font-semibold pt-5'>Select an Item you would like to List</h2>
            <hr className='mb-5'/>
            <p>Below you will find the Campaign requests .</p>
            <div className='flex overflow-x-scroll space-x-2 p-4'>
               {data?.map(nft => (
                    <div className={`flex flex-col space-y-2 card min-w-fit border-2 bg-gray-100
                     ${nft.metadata.id=== selectedNFT?.metadata.id ? 'border-black' : 'border-transparent'}`}
                     key={nft.metadata.id}
                     onClick={()=> setselectedNFT(nft)}>
                       <MediaRenderer className='h-48  rounded-lg' src={nft.metadata.image}/>
                       <p className='text-lg truncate font-bold'>{nft.metadata.name}</p>
                       <p className='text-xs max-w-2xl truncate'>{nft.metadata?.description}</p>
                    </div>
               )) }
            </div>
            
        {selectedNFT && (
            <form onSubmit={handleCreateCampaign}>
                <div className=' flex flex-col p-10'>
                    <div className='grid grid-cols-2 gap-5  '>
                        {/* <label className='border-r font-light'>Direct/Fixed Listing</label>
                        <input type='radio' name='listingType'
                        value='directListing' className='ml-auto h-10 w-10'/>

                        <label className='border-r font-light'>Auction </label>
                        <input type='radio' name='listingType'
                        value='auctionListing' className='ml-auto h-10 w-10'/> */}

                       {/* <label className='border-r font-light'>Wallet Address</label>
                        <input type='text' name='Address'
                        placeholder='0xkd0e5....' className='bg-gray-100 p-5'/> */}

                        <label className='border-r font-light'>Title</label>
                        <input type='text' name='Title'
                        placeholder='Title..' className='bg-gray-100 p-5'/>

                        <label className='border-r font-light'>Description</label>
                        <input type='text' name='Description'
                        placeholder='Description of issue..' className='bg-gray-100 p-5'/>

                        <label className='border-r font-light'>Target</label>
                        <input type='text' name='Target'
                        placeholder='Target Amount..' className='bg-gray-100 p-5'/>

                        <label className='border-r font-light'>Deadline</label>
                        <input type='date' name='Deadline'
                        placeholder='Eg: 12/10/2008' className='bg-gray-100 p-5'/>

                    </div>
                    <button className='bg-blue-600 text-white rounded-lg p-4 mt-8' type='submit'>
                        Create Campaign
                    </button>
                </div>
            </form>
            )
            }

        </main>
    </div>
  )

}

export default createCampaign
