const User=require("../models/userModel")
const Auth=require("../models/auth")

const bcrypt=require("bcryptjs")

const registerUser=async (req,res)=>{
    // try {
   
    try {
        const {email,password}=req.body
        const existing=await  Auth.findOne({email}) 
        if(existing)
        return res.status(400).json({message:"User Already Exists"})
        const hashedPassword=await bcrypt.hash(password,10)
        const authuser=new Auth({email,password:hashedPassword})
        await authuser.save();
        res.status(201).json({message:"Registered Successfully"})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await Auth.findOne({email})
        if(!user)
            return res.status(400).json({ message: 'Invalid email or password' });
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
            return res.status(400).json({message:"Invalid email or password"})

        const username=email.split("@",1)

        res.status(201).json({message:"User Login Successfully",username})

    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const createUser=async(req,res)=>{
    try {
        const {first_name,last_name,email,password}=req.body;
        const user=new User({first_name,last_name,email,password});
        await user.save();
        res.status(201).json(user);

    } catch (error) {
        console.log("not creating the user : ",error);
        res.status(400).json({err:error.message})
    }
}

const getAllUsers=async(req,res)=>{
try{
const users=await User.find();
res.status(200).json(users)
}catch(err){
res.status(500).json({error:err.message})
}
}

const getUserById=async(req,res)=>{
    try{
      
     const user=  await User.findById(req.params.id)
     if(!user)
        return res.status(404).json({error:"user not found"})
    res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}

const updateUser=async(req,res)=>{
    try {
        const user=await User.findById(req.params.id)
        const {first_name,last_name,email}=req.body;
        user.first_name=first_name;
        user.last_name=last_name;
        user.email=email;
       // user.password=password;
       const updated= await user.save()

      res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const deleteUser=async(req,res)=>{
    try {
    const user= await User.findById(req.params.id)
    if(!user)
        return res.status(400).json({error:"json not found"})
    await user.deleteOne();
    res.json({message:"user deleted"})
    } catch (error) {
        res.status(500).json({error:err.message})
    }
}



module.exports={createUser,getAllUsers,getUserById,updateUser,deleteUser,registerUser,loginUser}