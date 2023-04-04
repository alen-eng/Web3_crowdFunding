import { NextApiRequest, NextApiResponse } from "next"
import { hash,compare } from "bcryptjs"
import User from "../../../models/user"
import { IUser } from "../../../types"
import mongoose from "mongoose"
import { connectToMongoDB } from "../../utils/connection"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ status:400, })
        const { email,password } = JSON.parse(req.body)
        const userExists = await User.findOne({email})

        if (userExists!=null) {
            compare(password,userExists.password,
                (err,result)=>{   
                    if(result===true)
                    res.status(200).json({ status:200,})
                    else {
                        res.status(402).json({ status:402,})}
                })
                        
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