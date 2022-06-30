const scrape = require("./scrape.js"); 
const contest = require("./contest_model");
const express = require('express');
const mongoose = require('mongoose');
const { application } = require("express");
mongoose.connect("mongodb://localhost:27017/contestDB", {useNewUrlParser: true});

const app = express();

scrape();

app.get('/codechef',function(req, res){
     contest.find({Platform : "codechef"}, function(err, contest){
          if(err){
               console.log(err);
          }
          else{
               res.send(contest);
          }
     });
});

app.get('/', function(req, res){
    res.send("Hello");
});
app.listen(3000, function(){
     console.log("server running at port 3000");
})