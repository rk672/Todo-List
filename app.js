var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000;

var bodyparser = require("body-parser");
app.use(express.static("public"));
app.use(bodyparser.json());
var Data = require("./mongo");

var mongoose = require("mongoose");
var url = process.env.MONGO_URL || "mongodb://localhost:27017/Todo";
mongoose.connect(url,{useNewUrlParser:true , useUnifiedTopology : true})
    .then(function(){
        console.log("connection open");
    })
    .catch(function(err){
        console.log(err);
    });

app.get("/",function(req,res){
    res.render("todo.ejs")
});

app.post("/newTodo",function(req,res){
    var data =req.body;
    //console.log(data)
   /* for (const key in data) {
        console.log(key+" : "+data[key]);
    }*/
    //res.status(200);
    new Data({name : data.name,isChecked:false}).save();
    res.send("ok");

});

app.post("/delete",async function(req,res){
    var data =req.body.id;
    await Data.findByIdAndDelete(data);
    res.send("ok");
})

app.get("/data",async function(req,res){
    var data = await Data.find({});
    res.send(data)
})

app.post("/update",async function(req,res){
    var data =req.body.id;
    await Data.findByIdAndUpdate(data,{isChecked:req.body.isChecked});
    res.send("ok");
})

app.listen(PORT,function(){
    console.log("listening to"+PORT);
});
