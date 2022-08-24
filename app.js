const express = require("express");
const https= require("https");
const bodyParser= require("body-parser");


const app= express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
    
})
app.post("/",function(req, res){
   
    const query= req.body.cityName;
    const apiKey= "96504c52c6474be325d69d4514700004";
    const unit="metric";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey ;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
    const wData = JSON.parse(data);

    const temp= wData.main.temp
    const wDescription= wData.weather[0].description;
    const icon = wData.weather[0].icon;
    const imgUrl= "https://openweathermap.org/img/wn"+icon+"@2x.png";
    console.log(temp);
    console.log(wDescription);
    res.write("The weather description is " + wDescription);
    res.write("<h2> The current temperature in "+query+" is "+ temp 
    + " o </h2>");
    res.write("<img src="+imgUrl+" >");
    
    res.send();
    
        })
    })
})



app.listen(3000, function(){
    console.log("Server is running on port 3000");
})