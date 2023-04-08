import { NextApiRequest, NextApiResponse } from "next"
import Role from "../../models/role"
import { connectToMongoDB } from "../../utils/connection"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    connectToMongoDB().catch(err => res.json(err))

    if (req.method === "POST") {
        if (!req.body) return res.status(400).json({ status:400, })
        const { address} = JSON.parse(req.body)
        console.log(address)
        Role.create({
            address:address
         }).then(data => {
            return res.status(201).json({
                            status:201,
                            success: true,
                            msg:data }) 
           
         }).catch(err => {
              return res.send({status:405,msg:err})
             })
    }

else {
    res.status(405).json({ status:406, error: "Method Not Allowed" })
}
    

}
export default handler
