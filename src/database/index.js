import mongoose from "mongoose";

const connectToDataBase = async ()=>{
    const connectionURL = "mongodb+srv://ceyrio007:jSbrpV4gGzczdZti@mernlms.2lcbs.mongodb.net/"

    mongoose
    .connect(connectionURL)
    .then(()=>console.log("Mongodb Connected"))
    .catch((error)=>console.log(error))
}

export default connectToDataBase