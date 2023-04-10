import { NextApiRequest, NextApiResponse } from "next"
import { hash,compare } from "bcryptjs"
import User from "../../../models/user"
import { connectToMongoDB } from "../../../utils/connection"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ status:400, })
        const { email,password } = JSON.parse(req.body)
        const userExists = await User.findOne({email})

        if (userExists!=null) {
            if (password.length < 8)
            return res.status(409).json({ status:409, msg: "Password should be 8 characters long" })

        const hashedPassword = await hash(password, 12)
        User.findOneAndUpdate({email:email},{
            password: hashedPassword
         }).then(data => {
            return res.status(201).json({
                            status:200,
                            success: true,
                            msg:data }) 
           
         }).catch(err => {
              return res.send({msg:err})
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
