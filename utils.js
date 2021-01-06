const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  let numsList = [];
  for (let n of strNums){
    // parseInt takes string that starts with number and return number, Number function is stricter
    if (isNaN(parseInt(n))){
      throw new BadRequestError( `${n} is not a number`);
    }else{
      numsList.push(Number(n));
    }
  }
  return numsList;
}


module.exports = { convertStrNums };