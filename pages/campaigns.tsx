import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import CampaignHeader from '../components/CampaignHeader'
import { useActiveListings,
  useListings,
   useContract ,
    MediaRenderer,
    useContractRead
  } from '@thirdweb-dev/react'
import { ListingType } from '@thirdweb-dev/sdk'
import { BanknotesIcon,WalletIcon } from '@heroicons/react/24/outline'
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
    //deadline:camp[5].toNumber(),
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
        ): cam ==null || cam.length==3 ? (<div><h1 className=' text-green-400 text-center'>Sorry Don't have an active Campaign!!</h1></div>) 
        : ( <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-auto'>
            {cam?.map( (campaign:any) => (
            <Link 
            key={campaign.pId} 
            href= {`/campaign/${campaign.pId}`}
             // pathname: `/campaign/[campaignId]`,
              // query: {
              //   remainingDays: campaign.remainingDays,
              //   amountCollected: campaign.amountCollected, 
              //   target: campaign.target,
              //   image: campaign.image,
              //   story: campaign.story,
              //   title: campaign.title,
              //   address: campaign.address,
              // },
           // }}
            // as= {`/campaign/${campaign.pId}`} 
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
                   {/* <WalletIcon className='w-8 h-8'/> */}
                   <Image src={'/thirdweb.png'} alt='Thirdweb' width={16} height={16}/>
                   <p className='pt-1 ml-4 text-md font-semibold'>{campaign.address.slice(0,8) +"..."+campaign.address.slice(-8)}</p>
                   </div>
                   {/* <BsCashCoin size={30} className='bg-green-300 p-1 rounded'/> */}
                     {/* <p>
                      <span className='font-bold mr-1'>{campaign.buyoutCurrencyValuePerToken.displayValue}</span>
                      {campaign.buyoutCurrencyValuePerToken.symbol}
                     </p>  */}

                    {/* <div className={`flex items-center space-x-1 justify-end text-xs border w-fit ml-auto p-2
                     rounded-lg text-white ${campaign.type === ListingType.Direct ? 'bg-blue-500': "bg-red-500" } ` }
                     >
                      <p>
                        { campaign.type === ListingType.Direct ? "Buy Now" : "Auction"}
                        </p>
                        { campaign.type === ListingType.Direct ? (
                          <BanknotesIcon className='h-4'/> ) : <ClockIcon className='h-4'/>
                        }
                      
                  </div> */}
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

