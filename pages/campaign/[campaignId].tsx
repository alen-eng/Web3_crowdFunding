
import { 
   useContract ,
   useNetwork,
   useNetworkMismatch,
   useAddress,
   useContractRead,
   useMetamask,
   useDisconnect
  } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import network from '../../utils/network';
import { calculateBarPercentage, daysLeft } from '../../utils';
import CountBox from '../../components/CountBox';
type Props = {}

function CampaignCard (){
    const router= useRouter();
    const connectwithMetamask = useMetamask();
    const disconnect = useDisconnect();
    const useraddress = useAddress();

    const {campaignId} = router.query as { campaignId: string };
    
   const [ , switchNetwork] = useNetwork();
    const networkMismatch=useNetworkMismatch();

    const { contract } = useContract(process.env.NEXT_PUBLIC_CROWDFUNDING_CONTRACT);
    const { data: donators, isLoading} =  useContractRead(contract, "getDonators",[campaignId as any])
    const { data: campaign,isLoading:load } =  useContractRead(contract, "campaigns",[campaignId as any])

   
    var target=0;
    var address='';
    var title='';
    var story='';
    var image='';
    var remainingDays='';
    var amountCollected='';
   
    var donator: any[] = [];
    var donation:any[] = [];
   
    if(donators !== undefined){
      for(var i=0;i<donators[0].length;i++){
      donator.push(donators[0][i]);
      donation.push(ethers.utils.formatEther(donators[1][i].toString()));
     }
    }
      
   if(campaign !== undefined ){
      target=campaign[4].toNumber();
      address=campaign[0];
      title=campaign[1];
      story=campaign[2];
      image=campaign[3];
      remainingDays=daysLeft(campaign[5].toNumber());
      amountCollected=ethers.utils.formatEther(campaign[6].toString());
   }

const handleDonate= async (e: FormEvent<HTMLFormElement>) =>{
  e.preventDefault();
if(networkMismatch){
  switchNetwork  && switchNetwork(network);
  return;
}

const target= e.target as typeof e.target & {
  elements: {Amount:{value:number},
          };
      };

 contract?.call('donateToCampaign', [campaignId as any , {value: ethers.utils.parseEther(target.elements.Amount.value.toString()) } as any]),
      {
          onSuccess(data:any, variables:any, context:any) {
              console.log("Success : ", data, variables, context);
              router.push('/');
          },
          onError(error:any, variables:any, context:any) {
              console.log('Error : ', error, variables, context);
          },
        };

      };
  

       return(
         <div>
           {load ? (<div className='text-center mt-8 animate-pulse text-blue-500'>loading...</div>
           ) : (
           <div className='bg-[#f2f2fc] px-8 pb-12 pt-4'>
            <div className='ml-24 '>
              { useraddress ? (
                <button onClick={disconnect} className='connectWalletBtn'> Hi, {useraddress.slice(0,5)+ "...."+ useraddress.slice(-6)} </button>
             ) : (
            <button onClick={()=>{connectwithMetamask();}} className='connectWalletBtn'>Connect your wallet </button>
            )}</div>
            <div className="flex  md:flex-row justify-center mt-10 xl:space-x-96">
             <div className=" flex flex-col pt-8">
               <img src={image} alt="campaign" className=" h-80 object-cover rounded-xl" />
               <div className="relative w-full h-[10px] bg-[#3a3a43] mt-2 rounded"> 
                 <div className=" h-full bg-[#4acd8d] rounded" style={{width:`${calculateBarPercentage(target, amountCollected)}%`, maxWidth: '100%'}}>
                  </div>
               </div>
             </div>
              <div className="flex  md:w-[150px] flex-wrap gap-[20px]"> 
               <CountBox title="Days Left to end" value={remainingDays}/> 
               <CountBox title={`MATIC Raised ${target}`} value={amountCollected.slice(0,5)} /> 
                <CountBox title="Total Backers" value={donator.length} /> 
                </div>
               </div>

           <div className="mt-[60px] flex px-40 lg:flex-row flex-col gap-5">


             <div className="flex-[2] flex flex-col gap-[40px]">
               <div>
                 <h4 className="font-epilogue font-semibold text-xl pl-4 text-black uppercase">Creator</h4>
                 <div className="mt-[20px]  flex flex-row items-center flex-wrap gap-[14px]">
                   <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                     <img src={'/thirdweb.png'} alt="user" className="w-[60%] h-[60%] object-contain" />
                   </div>
                   <div>
                     <h4 className="font-epilogue font-semibold text-[14px] text-black break-all">{address}</h4>
                     <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">10 Campaigns</p>
                   </div>
                 </div>
               </div>

               <div>
                 <h4 className="font-epilogue font-semibold text-[18px] pl-4 text-black uppercase">Story</h4>
                 <div className="mt-[20px] pl-4">
                   <p className="font-epilogue font-normal max-w-2xl text-[16px] text-gray-600 leading-[26px] text-justify">{story}</p>
                 </div>
               </div>

               <div>
                 <h4 className="font-epilogue font-semibold text-[18px] pl-4 text-black uppercase">Donators</h4>
                  <div className="mt-[20px] flex flex-col gap-4">
                   {donator.length> 0 ? donator.map((item: any, index: any) => (
                     <div key={`${item.donator}-${index}`} className="flex md:space-x-44 sm:space-x-24 ">
                       <p className="font-epilogue pl-4 font-normal text-[16px] text-gray-600 leading-[26px] ">{index + 1}. <span className='font-semibold'>{donator[index]}</span></p>
                       <p className="font-epilogue  font-bold text-[16px] text-gray-600 leading-[26px] ">{donation[index]}</p>
                     </div>
                   )) : (
                     <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">No donators yet. Be the first one!</p>
                   )}
                 </div>
               </div>
             </div> 


             <div className="flex-1">
               <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Fund</h4>

               <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                 <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                   Fund the campaign
                 </p>

                 <form onSubmit={handleDonate}>
                   <div className="mt-[30px]">
                     <input
                       name='Amount'
                       type="number"
                       placeholder="MATIC 0.1"
                       step="0.01"
                       className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]" />

                     <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                       <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">Back it because you believe in it.</h4>
                       <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">Support the project for no reward, just because it speaks to you.</p>
                     </div>
                   </div>
                   <button type='submit' className='bg-blue-600 font-bold text-white rounded-full py-4 px-10 w-56 md:mt-auto mx-auto ml-auto'>Fund Campaign</button>
                 </form>
               </div>
             </div>
           </div>
           </div>
           )}
           </div> 
           )  
            };
        

export default CampaignCard;
