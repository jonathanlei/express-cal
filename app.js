"use strict"
/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const {convertStrNums} = require("./utils.js");
const {
  findMean,
  findMedian,
  findMode,
} = require("./stats.js");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

app.use(express.json());


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function(req, res, next){
  let numsStr = req.query.nums;
  if (!numsStr){
    return next(new BadRequestError("nums are required"));
  }
  let strNums = numsStr.split(",");
  let numList;
  try{
    numList = convertStrNums(strNums);
  }catch(err){
    return next(err);
  }
  let mean = findMean(numList);
  return res.json({operation: "mean", value: mean})
})

/** Finds median of nums in qs: returns {operation: "median", result } */

app.get("/median", function(req, res, next){
  let numsStr = req.query.nums;
  if (!numsStr){
    return next(new BadRequestError("nums are required"));
  }
  let strNums = numsStr.split(",");
  let numList;
  try{
    numList = convertStrNums(strNums);
  }catch(err){
    return next(err);
  }
  let median = findMedian(numList);
  return res.json({operation: "median", value: median})
})


/** Finds mode of nums in qs: returns {operation: "mode", result } */

app.get("/mode", function(req, res, next){
  let numsStr = req.query.nums;
  if (!numsStr){
    return next(new BadRequestError("nums are required"));
  }
  let strNums = numsStr.split(",");
  let numList;
  try{
    numList = convertStrNums(strNums);
  }catch(err){
    return next(err);
  }
  let mode = findMode(numList);
  return res.json({operation: "all", value: mode})
})


/*  Finds mean, median and mode of nums in qs: returns {operation: "all", results } */

app.get("/all", function(req, res, next){
  let numsStr = req.query.nums;
  if (!numsStr){
    return next(new BadRequestError("nums are required"));
  }
  let strNums = numsStr.split(",");
  let numList;
  try{
    numList = convertStrNums(strNums);
  }catch(err){
    return next(err);
  }
  let mean = findMean(numList);
  let median = findMedian(numList);
  let mode = findMode(numList);
  return res.json({operation: "all",
                   mean,
                   median,
                   mode})
})
/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});




module.exports = app;