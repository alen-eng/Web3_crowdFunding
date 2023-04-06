import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ status:400, })
        const { name,email,subject,message } = JSON.parse(req.body)     
              
                 var transporter = nodemailer.createTransport({
                  host:'smtp.gmail.com',
                  port:587,
                  secure:true,
                  service: 'gmail',
                  auth: {
                    user:'shoppingcarta7@gmail.com',
                    pass: process.env.NEXT_PUBLIC_PASS_EMAIL,
                    //''
                  }
                });
                
                var mailOptions = {
                  from:'shoppingcarta7@gmail.com' ,
                  to:"myportfolio312@gmail.com",
                  subject: 'Tcare Enquiry ',
                  text: 'To the company,\n' + 
                   " I'm "+" "+ name + " and i would like to enquire about " + subject + ". \n" +message+"\n"+ "To contact me please use this email"+" "+ email                                                                                                     
                  
                };
                
                transporter.sendMail(mailOptions, function(error:any, info:any){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({ status:200,})
                  }
                });
              
            }}
export default handler
