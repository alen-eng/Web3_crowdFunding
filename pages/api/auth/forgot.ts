import { NextApiRequest, NextApiResponse } from "next"
import { hash,compare } from "bcryptjs"
import User from "../../../models/user"
import { IUser } from "../../../types"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import { connectToMongoDB } from "../../../utils/connection"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ status:400, })
        const { email} = JSON.parse(req.body)
        const userExists = await User.findOne({email})
        if (userExists!=null) {
              res.status(200).json({ status:200,})
              const JWT_SECRETE='5fbtg5eg';
              
                 const secret= JWT_SECRETE + email;
                 const payload={
                   email:email
                 }
                 const token=jwt.sign(payload,secret,{expiresIn:'15m'})
                 const link=`https://web3-crowd-funding.vercel.app/${email}/${token}`;
                 var transporter = nodemailer.createTransport({
                  host:'smtp.gmail.com',
                  port:587,
                  secure:true,
                  service: 'gmail',
                  auth: {
                    user:'shoppingcarta7@gmail.com',
                    pass:process.env.PASS_EMAIL
                  }
                });
                
                var mailOptions = {
                  from:'shoppingcarta7@gmail.com' ,
                  to:email,
                  subject: ' Password Reset ',
                  text: 'Your Password rest link is : '+link
                };
                
                transporter.sendMail(mailOptions, function(error:any, info:any){
                  if (error) {
                    console.log(error);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                });
              
        }
       else {
         res.status(401).json({ status:401})
      }
    }
 else {
     res.status(406).json({ status:406,msg: "Method Not Allowed" })
  }

}
export default handler
