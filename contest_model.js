const scrape = require("./scrape.js"); 
const express = require('express');
const mongoose = require('mongoose');
const { application } = require("express");

const contestschema = new mongoose.Schema({
    Platform: String,
    Code: String,
    Name: String,
    conteststatus: String,
    Date: String,
    Time: String,
    Duration: String
 });
 

module.exports = mongoose.model("Contest", contestschema);