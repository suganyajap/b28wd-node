//const express=require('express');//"type":"commonjs"
import express from "express";//"type":"module"
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { moviesRouter } from "./routes/movies.js";
import { usersRouter } from "./routes/users.js";
import cors from "cors";

dotenv.config();//it will put all the key and value pair inside the process.env
console.log(process.env);
const app=express();
const PORT=process.env.PORT;
app.use(cors());//3rd party middleware,every request in the app is allowed access/access by any origin/any where
//middleware
app.use(express.json());//every request in the app body is parsed to json
//express.json()-inbuilt middleware

//const movies=
const MONGO_URL=process.env.MONGO_URL;
async function  createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();//promise
    console.log("Mongo db Connected");
    return client;
}
export const client=await createConnection();
app.get('/',(request,response)=>
{
    response.send("Hello ***🌍😊");
});

app.use("/movies",moviesRouter);
app.use("/users",usersRouter);
const recipes=[
    {name:"panner butter masala",
    picture:"https://www.indianveggiedelight.com/wp-content/uploads/2017/09/instant-pot-paneer-butter-masala-featured.jpg"
  },
  {name:"biriyani",
    picture:"https://thumbs.dreamstime.com/z/chicken-dum-biryani-white-bowl-traditional-indian-one-pot-dish-background-high-angle-view-156498926.jpg"
  },
  {name:"gobi manchurian",
    picture:"https://www.seekpng.com/png/detail/794-7942259_cauliflower-manchurian-gobi-manchurian-images-png.png"
  },
  {name:"parota shawarma",
    picture:"https://bigoven-res.cloudinary.com/image/upload/t_recipe-1280/egg-paratha-1b75f5.jpg"
  },
  {name:"chicken tandoori",
    picture:"https://image.shutterstock.com/image-photo/arabian-arabic-cuisine-grilled-tandoori-260nw-1202127400.jpg"
  },
  ];
  app.get('/recipes',async(request,response)=>
{   
    const recipes=await client.db("b28wd").collection("movies").find({}).toArray();
    response.send(recipes);
});
app.post('/recipes',async(request,response)=>{
    const data =request.body;
    //const movies=db.movies.insertMany(data)
    const  result = await client.db("b28wd").collection("recipes").insertMany(data);
    response.send(result);
});

app.listen(PORT,()=>console.log("App is started in ",PORT));


