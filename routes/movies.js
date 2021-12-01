import express from "express";
const router=express.Router();

app.get('/movies', async (request,response)=>
{
    //request->query params
    console.log(request.query);
    const filter = request.query;
    console.log(filter);
    if(filter.rating){
        filter.rating=+filter.rating;
    }
    
    //db.movies.find({language:"tamil",rating:8})
    const filterMovies=  await getMovies(filter);//cursor to array
    //console.log(filterMovies);
    //cursor-pagination 1 2 3 4 5 next->
     response.send(filterMovies);
});
app.post("/movies",async(request,response)=>{
    const data =request.body;
    //const movies=db.movies.insertMany(data)
    const  result = await createMovies(data);
    response.send(result);
});
app.get('/movies/:id',async (request,response)=>
{
    console.log(request.params);
    const { id } = request.params;
    //db.movies.findOne({id:"102"})
    const movie = await getMovieById(id);
    //const movie=movies.find((mv)=>mv.id===id);
    console.log(movie);
  movie ? response.send(movie) : response.status(404).send({message:"No matching movie found"});

});
app.delete('/movies/:id',async (request,response)=>
{
    console.log(request.params);
    const { id } = request.params;
    //db.movies.findOne({id:"102"})
    const result = await deleteMovieById(id);
    //const movie=movies.find((mv)=>mv.id===id);
    console.log(result);
  result.deletedCount > 0 
  ? response.send(result) 
  : response.status(404).send({message:"No matching movie found"});

});
app.put('/movies/:id',async (request,response)=>
{
    console.log(request.params);
    const { id } = request.params;
    //db.movies.updateOne({id:"102"},{$set:data})
    const data=request.body;
    const result = await updateMovieById(id, data);
    const movie = await getMovieById(id);
    //const movie=movies.find((mv)=>mv.id===id);
    response.send(movie);

});