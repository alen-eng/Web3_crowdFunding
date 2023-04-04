// import {MongoClient} from 'mongodb'
// const options={}
// const URI=process.env.MONGODB_URI
// const dbname='charityapp'

//    if(!URI) throw new Error('No URL provided')
//    let client = new MongoClient(URI,options)
//    let clientPromise

//    if(process.env.NODE_ENV!=='production'){
//        if (!global._mongoClientPromise) {
//          client = new MongoClient(URI)
//          global._mongoClientPromise = client.connect()
//        }
//        clientPromise = global._mongoClientPromise
//       }else{
//         clientPromise=client.connect()
//     }
   
//     export default clientPromise;




// import mongoClient from 'mongodb'
// const state ={
//     db:null
// }
// module.exports.connect=function(done){
//    const url= process.env.MONGODB_URI
//     const dbname='charityapp'

//     mongoClient.connect(url,(err)=>{
//         if(err) return done(err)
//         state.db=data.db(dbname)
//     })

// }

//  module.exports.get=function(){
//     return state.db
// }



import mongoose from "mongoose";

const { MONGODB_URI } = process.env


if (!MONGODB_URI) {
    throw new Error("Invalid environment variable: MONGODB_URI");
}

export const connectToMongoDB = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI)
        
        if (connection.readyState === 1) {
            return Promise.resolve(true)
        }

    } catch (error) {
        return Promise.reject(error)
    }
}
