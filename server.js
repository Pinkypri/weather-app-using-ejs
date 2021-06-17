const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();
app.set("view engine","ejs");
app.use('/css', express.static('css'));
//app.use('/images',express.static('images'));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
    

});

app.post("/data",(req,res)=>{
const city=req.body.city;
const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d7fe7181a9a277132f406381c3c0980f`;

 https.get(url,(response)=>{
  response.on("data",(data)=>{
      const weather=JSON.parse(data);
    

    const dd=weather;
    const icon=dd.weather[0].icon;
    
    const temp = (dd.main.temp-272.15).toFixed(1);
    const name=dd.name;
   const tempmin= (dd.main.temp_min-272.15).toFixed(1);
   const tempmax= (dd.main.temp_max-272.15).toFixed(1);
   const humidity=dd.main.humidity;
   const description=dd.weather[0].description;
   const windspeed=dd.wind.speed;
    const cloud=`https://openweathermap.org/img/wn/${icon}.png`;
   
    res.render("result",{
      
        name,
        cloud,
        temp,
        tempmin,
        tempmax,
        windspeed,
        description,
        humidity

     })
  })
 
})

});

app.listen(5000,()=>{
    console.log("server has been started port on 5000");
});