// const mongoose = require("mongoose");

// const userSchema=new mongoose.Schema({
//     id:{
//        type:"Number" ,
//     unique:true},

// first_name:String,
// last_name:String,
// email:String,
// password:String
// })

// module.exports=mongoose.model("User",userSchema)

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", userSchema);
