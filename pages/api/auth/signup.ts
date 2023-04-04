import { NextApiRequest, NextApiResponse } from "next"
import { hash } from "bcryptjs"
import User from "../../../models/user"
import { IUser } from "../../../types"
import mongoose from "mongoose"
import { connectToMongoDB } from "../../utils/connection"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ status:400,error: "Data is missing" })
        const { fullName,email,password } = JSON.parse(req.body)
 
       const userExists = await User.findOne({ email })

        if (userExists!==null) {
            return res.status(406).json({ status:406,msg: "User Already exists" }) 
        }
        else {
            if (password.length < 8)
                return res.status(409).json({ status:409, msg: "Password should be 8 characters long" })

            const hashedPassword = await hash(password, 12)
     
            User.create({
                fullName,
                email,
                password: hashedPassword
             }).then(data => {
                return res.status(201).json({
                                status:201,
                                success: true,
                                msg:data }) 
               
             }).catch(err => {
                  return res.send({msg:err})
                 })
        }
    }
    else {
        res.status(405).json({ error: "Method Not Allowed" })
    }
}

export default handler