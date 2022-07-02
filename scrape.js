const puppeteer = require('puppeteer');
const Contest = require("./contest_model");
const mongoose = require('mongoose');


var globalRow = [];
// console.log("A")
module.exports = async function scrape() {
   const browser = await puppeteer.launch({
      executablePath: '/usr/bin/chromium-browser'
    })
   const page = await browser.newPage()

   await page.goto('https://www.codechef.com/contests/?itm_medium=navmenu&itm_campaign=allcontests')
   var i = 1;
   codechef_present = [];
   console.log("Scanning Present Codechef");
   while(true){
        try{
         row = [];
                         for(var k = 1; k <= 3 + 1; k++){
                  var element = await page.waitForSelector("#present-contests-data > tr:nth-child(" + i + ") > td:nth-child(" + k + ") ");
                  var text = await page.evaluate(element => element.textContent, element);
                  row.push(text);
               }
               is_present = false;
               globalRow = row;
               Contest.find({Code : row[0]}, function(err, foundcontest){
                  if(err){
                       console.log(err);
                  }
                  else{
                        if(foundcontest.length == 0){
                           const contest = new Contest({
                              Platform: "codechef",
                              Code: globalRow[0],
                              Name: globalRow[1],
                              conteststatus: "live",
                              Date: globalRow[2].slice(0, 11),
                              Time: globalRow[2].slice(15),
                              Duration: globalRow[3]
                           });
            
                           contest.save();
                        }
                  }
             });

               codechef_present.push(row);
               console.log(".");
               i++;
        }
        catch(e) {
            console.log("Scanning Present Codechef Complete");
             break;
        }
     }
     i = 1;
     codechef_upcoming = [];
     console.log("Scanning Upcomming Codechef");
   while(true){
        try{
         row = [];
             for(var k = 1; k <= 3 + 1; k++){
                  var element = await page.waitForSelector("#future-contests-data > tr:nth-child(" + i + ") > td:nth-child(" + k + ") ");
                  var text = await page.evaluate(element => element.textContent, element);
                  row.push(text);
               }
               var is_present = false;
               globalRow = row;
               Contest.find({Code : row[0]}, function(err, foundcontest){
                  if(err){
                       console.log(err);
                  }
                  else{
                        if(foundcontest.length == 0){
                     const contest = new Contest({
                        Platform: "codechef",
                        Code: globalRow[0],
                        Name: globalRow[1],
                        conteststatus: "upcomming",
                        Date: globalRow[2].slice(0, 11),
                        Time: globalRow[2].slice(15),
                        Duration: globalRow[3]
                     });
      
                     contest.save();
                  }
                  }
             });
               codechef_upcoming.push(row);
               console.log(".");
               i++;
        }
        catch(e) {

            console.log("Scanning Upcomming Codechef Complete");
             
             break;
        }
     }
     i = 1;
     codechef_practice = [];
     console.log("Scanning Practice Codechef");

   while(true){
        try{
         row = [];
             for(var k = 1; k <= 3 + 1; k++){
                  var element = await page.waitForSelector("#practice-contests-data > tr:nth-child(" + i + ") > td:nth-child(" + k + ") ");
                  var text = await page.evaluate(element => element.textContent, element);
                  row.push(text);
               }
               globalRow = row;
               Contest.find({Code : row[0]}, function(err, foundcontest){
                  if(err){
                       console.log(err);
                  }
                  else{
                        if(foundcontest.length == 0){
                     const contest = new Contest({
                        Platform: "codechef",
                        Code: globalRow[0],
                        Name: globalRow[1],
                        conteststatus: "practice",
                        Date: globalRow[2].slice(0, 11),
                        Time: globalRow[2].slice(15),
                        Duration: globalRow[3]
                     });
      
                     contest.save();
                  }
                  }
             });
               codechef_practice.push(row);
               console.log(".");
               i++;
        }
        catch(e) {
     console.log("Scanning Practice Codechef Complete");

             break;
        }
     }
     codeforces = []
 
    await page.goto('https://codeforces.com/contests')
    console.log("Scanning Codeforces");
    i = 2
    flag = true;
    while(flag){
      try{
         row = [];
 
       for(let k=0;k<=5;k++){
          if(k!=2){
            if(k == 0){
               var element = await page.waitForSelector("table > tbody > tr:nth-child(" + i + ")")
               var text = await page.evaluate(el => el.getAttribute("data-contestid"), element)
               row.push(text.trim())
            }
            else{
               try{
               var element = await page.waitForSelector("table > tbody > tr:nth-child(" + i + ") > td:nth-child(" + k + ")")
               var text = await page.evaluate(element => element.textContent, element)
               if(k == 5)
               var a = text.trim();
               if(k == 5 && a == "Final standings"){
                  flag = false;
                  break;
               }
               row.push(text.trim())
               }
               catch(e){
                  break;
               }
            }
          }
       }
       if(flag == false){
         break;
      }
       globalRow = row;
         Contest.find({Code : row[0]}, function(err, foundcontest){
            if(err){
                  console.log(err);
            }
            else{
                        if(foundcontest.length == 0){
               const contest = new Contest({
                  Platform: "codeforces",
                  Code: globalRow[0],
                  Name: globalRow[1],
                  conteststatus: "upcomming",
                  Date: globalRow[2].slice(0, 11),
                  Time: globalRow[2].slice(15),
                  Duration: globalRow[3]
               });
         
               contest.save();
            }
            }
         });
       codeforces.push(row);
       console.log(".");
       i++
}
catch(e){
   console.log("Scanning Codeforces Complete");
   break;
}
    }
   console.log("Scanning Codeforces Complete");
    browser.close()   
}