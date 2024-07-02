import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import ejs from "ejs";

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",async (req,res)=>{
     try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=12.97&lon=77.59&appid=b919d2319e8962ef405f3811524e841c`)
        const result = response.data;
        res.render("index.ejs", {data: result})
     }catch(error){
        res.render("index.ejs", {error: error.message});
     }
});

app.post("/submit",async (req,res)=>{
    const long = req.body.longitude;
    const lat = req.body.latitude;

    try{
       const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b919d2319e8962ef405f3811524e841c`)
       const result = response.data;
       res.render("index.ejs",{data: result});
    }catch(error){
        console.log('Failed to make request:' + error.message);
        res.render("index.ejs", {error: error.message});
    }
})

app.listen(3000,()=>{
    console.log(`Server running on port ${port}.`);
});