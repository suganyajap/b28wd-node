import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {createUser,genPassword,getUserByName} from "../helper.js";
const router = express.Router();

router.route("/signup").post(async(request,response)=>{
    const {username,password}=request.body;
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);
    //check for user exits in db
    if(userFromDB){
        response.status(400).send({message:"user name already exists"});
        return;
    }

    if(password.length < 8){
        response.status(400).send({message:"password must be longer"});
        return;
    }
    //pattern checking
    if(!/^(?=.*[0-9])(?=.*[a-z)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#%&]).{8,}$/g.test(password)){
        response.status(400).send({message:"password does not match"});
        return;
    }
    //inserting record(documents) in collections
    const hashedPassword=await genPassword(password);
    const result= await createUser({username,password:hashedPassword});
    response.send(result);
});

router.route("/login").post(async(request,response)=>{
    const {username,password}=request.body;
    const userFromDB = await getUserByName(username);
    console.log(userFromDB);
    //check for user not exits in db
    if(!userFromDB){
        response.status(401).send({message:"Invalid credentials"});
        return;
    }
    //if password is match then
    const storedPassword=userFromDB.password;
    console.log(storedPassword);
    const isPasswordMatch= await bcrypt.compare(password,storedPassword);
    console.log(isPasswordMatch);

    if(isPasswordMatch){
       const token= jwt.sign({id:userFromDB._id},process.env.SECRET_KEY)//hide secret key
        response.send({message:"successful login",token:token});
    }else{
        response.status(401).send({message:"Invalid credentials"});
    }
});
export const usersRouter=router;