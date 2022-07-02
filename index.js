const scrape = require("./scrape.js");
const contest = require("./contest_model");
const express = require('express');
const mongoose = require('mongoose');
const { application } = require("express");
mongoose.connect("mongodb+srv://admin:zxtqqD5rDBDkrjdT@cluster0.qquu6.mongodb.net/contestDB", { useNewUrlParser: true });

const app = express();
// setInterval(scrape, 1000 * 60 * 60);

scrape();

app.get('/codechef', function (req, res) {
     if (req.query.conteststatus == "live") {
          contest.find({ Platform: "codechef", conteststatus: "live" }, function (err, contest) {
               if (err) {
                    console.log(err);
               }
               else {
                    res.send(contest);
               }
          });
     }
     else if (req.query.conteststatus == "upcomming") {
          contest.find({ Platform: "codechef", conteststatus: "upcomming" }, function (err, contest) {
               if (err) {
                    console.log(err);
               }
               else {
                    res.send(contest);
               }
          });
     }
     else if (req.query.conteststatus == "practice") {
          contest.find({ Platform: "codechef", conteststatus: "practice" }, function (err, contest) {
               if (err) {
                    console.log(err);
               }
               else {
                    res.send(contest);
               }
          });
     }
     else {
          contest.find({ Platform: "codechef" }, function (err, contest) {
               if (err) {
                    console.log(err);
               }
               else {
                    res.send(contest);
               }
          });
     }
});

app.get('/codeforces', function (req, res) {
     if (req.query.conteststatus == "live") {
          contest.find({ Platform: "codeforces", conteststatus: "live" }, function (err, contest) {
               if (err) {
                    console.log(err);
               }
               else {
                    res.send(contest);
               }
          });
     }
     else if (req.query.conteststatus == "upcomming") {
          contest.find({ Platform: "codeforces", conteststatus: "upcomming" }, function (err, contest) {
               if (err) {
                    console.log(err);
               }
               else {
                    res.send(contest);
               }
          });
     }
     else if (req.query.conteststatus == "practice") {
          res.status(400).send(
               {
                    message: "Bad Request"
               }
          );
     }
     else {
          contest.find({ Platform: "codeforces" }, function (err, contest) {
               if (err) {
                    console.log(err);
               }
               else {
                    res.send(contest);
               }
          });
     }
});

app.get('/', function (req, res) {
     contest.find({}, function (err, contest) {
          if (err) {
               console.log(err);
          }
          else {
               res.send(contest);
          }
     });
});

let port = process.env.PORT;
if(port == null || port == ""){
     port = 3000;
}

app.listen(port, function () {
     console.log("server running at port 3000");
});
