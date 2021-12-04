import bcrypt  from "bcrypt";
import { ObjectId } from "mongodb";
import { client } from "./index.js";


 async function updateMovieById(id, data) {
    return await client
        .db("b28wd")
        .collection("movies")
        .updateOne({_id: ObjectId(id)}, { $set: data });
}
 async function createMovies(data) {
    return await client.db("b28wd").collection("movies").insertMany(data);
}
async function createUser(data) {
    return await client.db("b28wd").collection("users").insertOne(data);
}

 async function getMovies(filter) {
    return await client
        .db("b28wd")
        .collection("movies")
        .find(filter)
        .toArray();
}
 async function deleteMovieById(id) {
    return await client
        .db("b28wd")
        .collection("movies")
        .deleteOne({ _id: ObjectId(id)});
}//_id: ObjectId(id) id:id
 async function getMovieById(id) {
     console.log("***",id);
    return await client
        .db("b28wd")
        .collection("movies")
        .findOne({ _id: ObjectId(id)});
}
async function getUserByName(username) {
    
   return await client
       .db("b28wd")
       .collection("users")
       .findOne({ username:username});
}
async function genPassword(password){
    const NO_OF_ROUNDS=10;
    const salt= await bcrypt.genSalt(NO_OF_ROUNDS);
    console.log(salt);
    const hashedPassword= await bcrypt.hash(password,salt);
    console.log(hashedPassword);
    return hashedPassword;
}
export { getMovies, 
    createMovies, 
    getMovieById, 
    deleteMovieById, 
    updateMovieById ,
    genPassword,
    createUser,
    getUserByName
}