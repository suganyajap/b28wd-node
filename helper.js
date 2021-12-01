import { client } from "./index.js";

 async function updateMovieById(id, data) {
    return await client
        .db("b28wd")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}
 async function createMovies(data) {
    return await client.db("b28wd").collection("movies").insertMany(data);
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
        .deleteOne({ id: id});
}
 async function getMovieById(id) {
    return await client
        .db("b28wd")
        .collection("movies")
        .findOne({ id: id });
}
export { getMovies, 
    createMovies, 
    getMovieById, 
    deleteMovieById, 
    updateMovieById }