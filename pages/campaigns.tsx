import type { NextPage } from 'next'
import Image from 'next/image'
import CampaignHeader from '../components/CampaignHeader'
import { 
   useContract ,
    MediaRenderer,
    useContractRead
  } from '@thirdweb-dev/react'
import Link from 'next/link'

import { ethers } from 'ethers'
import { daysLeft } from '../utils'
import CountBox from '../components/CountBox'

const Home: NextPage = () => {
  const {contract}= useContract(process.env.NEXT_PUBLIC_CROWDFUNDING_CONTRACT);
  const { data: campaigns, isLoading:loadingCampaigns,} = useContractRead(contract, "getCampaigns")
 var cam = campaigns?.map((camp:any, i:number) => {
if(daysLeft(camp[5].toNumber()) as any > -1){
  return Object.assign({}, {
    address:camp[0],
    title:camp[1],
    story:camp[2],
    image:camp[3],
    target:camp[4],
    amountCollected: ethers.utils.formatEther(camp.amountCollected.toString()),
    pId:i,
    remainingDays:daysLeft(camp[5].toNumber()), 
  });
} else return null
});

if(cam != undefined){
  var count=0;
for(var i=0;i<cam.length;i++){
  if(cam[i] == null){ 
    count++;
  }
} 
if(count==cam.length){
cam==null;
}
else cam=cam.filter((item:any)=>item!=null); }

  return (
    <div>
  <CampaignHeader/>
    <main className='max-w-6xl mx-auto py-2 px-6'>
      {loadingCampaigns ? ( <p className='text-center animate-pulse text-blue-500'>
        Loading   Campaigns...</p>
        ): cam ==null ? (<div><h1 className=' text-green-400 text-center'>Sorry Don't have an active Campaign!!</h1></div>) 
        : ( <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto'>
            {cam?.map( (campaign:any) => (
            <Link 
            key={campaign.pId} 
            href= {`/campaign/${campaign.pId}`}
            className='flex flex-col bg-gray-200 card content-around hover:scale-105 transition-all duration-105 ease-out'
            >
            <div>
              <div className=' flex flex-col pb-2 items-center'>
                <MediaRenderer className='' src={campaign.image}/>
                </div>

                <div className='pt-2 space-y-4 '>
                   <div>
                     <h2 className='text-xl font-bold truncate'>
                      {campaign.title}
                     </h2>
                     <hr/>
                     <p className='text-sm text-gray-600 mt-2 font-serif'>{campaign.story}</p>
                    </div> 

                   <div className='grid grid-cols-2 space-x-2'>
                   <CountBox title="No. of Days Left " value={campaign.remainingDays} />
                   <CountBox title={`Raised of ${campaign.target} MATIC`} value={campaign.amountCollected}/>
                   </div>
                   
                <div className='flex flex-row p-1 bg-[#fffceb] rounded'>
                   <Image src={'/thirdweb.png'} alt='Thirdweb' width={16} height={16}/>
                   <p className='pt-1 ml-4 text-md font-semibold'>{campaign.address.slice(0,8) +"..."+campaign.address.slice(-8)}</p>
                   </div>
                </div>
              </div>
            </Link>
          ))}   
          </div>  
          )
          }
    </main>

    </div>
      );
};

export default Home
function getCampaigns(contract: import("@thirdweb-dev/sdk").SmartContract<import("ethers").BaseContract> | undefined): { data: any; isLoading: any } {
  throw new Error('Function not implemented.')
}

