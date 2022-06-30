const puppeteer = require('puppeteer');
const Contest = require("./contest_model");
const mongoose = require('mongoose');


// console.log("A")
module.exports = async function scrape() {
   const browser = await puppeteer.launch({})
   const page = await browser.newPage()

   await page.goto('https://www.codechef.com/contests/?itm_medium=navmenu&itm_campaign=allcontests')
   var i = 1;
   codechef_present = [];
   while(true){
        try{
             row  = [];
                         for(var k = 1; k <= 3 + 1; k++){
               //    console.log(i, k);
                  var element = await page.waitForSelector("#present-contests-data > tr:nth-child(" + i + ") > td:nth-child(" + k + ") ");
                  var text = await page.evaluate(element => element.textContent, element);
                  row.push(text);
               }
               const contest = new Contest({
                  Platform: "codechef",
                  Code: row[0],
                  Name: row[1],
                  ispresent: true,
                  Date: row[2],
                  Time: row[2],
                  Duration: row[3]
               });

               contest.save();
               codechef_present.push(row);
               i++;
        }
        catch(e) {
            //  console.log(i);
             break;
        }
     }
     i = 1;
     codechef_upcoming = [];
   while(true){
        try{
             row  = [];
             for(var k = 1; k <= 3 + 1; k++){
               //    console.log(i, k);
                  var element = await page.waitForSelector("#future-contests-data > tr:nth-child(" + i + ") > td:nth-child(" + k + ") ");
                  var text = await page.evaluate(element => element.textContent, element);
                  row.push(text);
               }
               const contest = new Contest({
                  Platform: "codechef",
                  Code: row[0],
                  Name: row[1],
                  ispresent: false,
                  Date: row[2],
                  Time: row[2],
                  Duration: row[3]
               });

               contest.save();
               // console.log(row)
               codechef_upcoming.push(row);
               i++;
        }
        catch(e) {
             // console.log(i);
             break;
        }
     }
     i = 1;
     codechef_practice = [];
   while(true){
        try{
             row  = [];
             for(var k = 1; k <= 3 + 1; k++){
               //    console.log(i, k);
                  var element = await page.waitForSelector("#practice-contests-data > tr:nth-child(" + i + ") > td:nth-child(" + k + ") ");
                  var text = await page.evaluate(element => element.textContent, element);
                  row.push(text);
               }
               const contest = new Contest({
                  Platform: "codechef",
                  Code: row[0],
                  Name: row[1],
                  ispresent: false,
                  Date: row[2],
                  Time: row[2],
                  Duration: row[3]
               });

               contest.save();
               codechef_practice.push(row);
               i++;
        }
        catch(e) {
             // console.log(i);
             break;
        }
     }
     codeforces = []
 
    await page.goto('https://codeforces.com/contests')
    i = 2
    while(i<=3){
       row = []
       // var element = await page.waitForSelector("table > tbody > tr:nth-child(" + i + ")")
       // var text = await page.evaluate(e => e.getAttribute("data-contestid"))
       
       row.push("0")
 
       for(let k=1;k<5;k++){
          if(k!=2){
 
             var element = await page.waitForSelector("table > tbody > tr:nth-child(" + i + ") td:nth-child(" + k + ")")
             var text = await page.evaluate(element => element.textContent, element)
             row.push(text.trim())
          }
       }
       const contest = new Contest({
         Platform: "codeforces",
         Code: row[0],
         Name: row[1],
         ispresent: true,
         Date: row[2],
         Time: row[2],
         Duration: row[3]
      });

      contest.save();
       codeforces.push(row)
       i++
    }
    browser.close()
    
}

