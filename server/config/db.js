const mongo=require("mongoose")

const connectDB=async()=>{
    try {
        await mongo.connect("mongodb://localhost:27017/crud_app")
          console.log("mongodb successfully connected")
    } catch (error) {
        console.log("not connected : ",error)
    }
}

 module.exports={connectDB}