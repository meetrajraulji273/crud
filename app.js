const express = require("express");
const app = express();
const Path = require("path");
const mongoose = require("mongoose");
const Info = require("./models/infoSchema.js")
const methodOverride = require("method-override");

app.set("views",Path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(Path.join(__dirname,"public")))
app.use(express.urlencoded({extende:true}));
app.use(methodOverride("_method"));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/info');
}

main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})



//backend listening
app.listen("8080",()=>{
    console.log("server is listening on port 8080");
});

//Home route
app.get("/",(req,res)=>{
    res.send("root is working");
})

//Info route
app.get("/info",async (req,res)=>{
    let data = await Info.find({})
    res.render("info.ejs",{data})
})

//new route
app.get("/info/new",(req,res)=>{
    res.render("new.ejs")
})

//create route
app.post("/info",async (req,res)=>{
    const {name,email,address,subject} = req.body;
    let newData = new Info({
        name:name,
        email:email,
        address:address,
        subjects:['English','Maths','Science','Social Studies','Economics'],
        subject:subject,
    })

    newData.save().then((res)=>{
        console.log("chat was saved");
    }).catch((err)=>{
        console.log(err);
    })

    res.redirect("/info");
})

//edit route
app.get("/info/:id/edit",async (req,res)=>{
    let {id} = req.params;

   let item= await Info.findById(id);
   console.log(item)
   res.render("edit.ejs",{item});
})

//update route
app.put("/info/:id",async (req,res)=>{
    let {id} = req.params;
    let {name:newName} = req.body;
    let {email:newEmail} = req.body;
    let {address:newAddress} = req.body;
    let {subject:newSubject} = req.body;
    let {subjects} = req.body;
    let updatedData = await Info.findByIdAndUpdate(id,{
        $set:{
            name:newName,
            email:newEmail,
            address:newAddress,
            subject:newSubject,
            subjects:subjects,
        }
    },{runValidators:true,new: true})

    console.log(updatedData);
    res.redirect("/info");
})

app.delete("/info/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedData  = await Info.findByIdAndDelete(id,{new:true});
    console.log(deletedData);
    res.redirect("/info");
})

app.get("/test",(req,res)=>{
    res.render("test.ejs")
})