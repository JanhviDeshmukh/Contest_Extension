import scrape from "./scrape.js";
import express from 'express';
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/contestDB", {useNewUrlParser: true});

const app = express();

const contestschema = new mongoose.Schema({
     Platform: String,
     Code: String,
     Name: String,
     ispresent: Boolean,
     Date: String,
     Time: Number,
     Duration: Number
  });
  
const Contest = mongoose.model("Contest", contestschema);

scrape();

app.get('codechef',function(req, res){
     Contest.find({Platform : "codechef"}, function(err, contest){
          if(err){
               console.log(err);
          }
          else{
               res.send(contest);
          }
     })
});

app.listen(3000, function(){
     console.log("server running at port 3000");
})