const httpStatus = require("http-status-codes");

// exports.logErrors = (error, req, res, next) => {
//   //log the error trace stack to the console
//   console.error(error.stack);
//   //pass error object to the next middleware function for further processing
//   next(error);
// };

exports.respondNoResourceFound = (req, res) => {
  //Respond with a 404 status code.
  let errorCode = httpStatus.NOT_FOUND;
  res.status(errorCode);
  res.sendFile(`./public/${errorCode}.html`, {root: "./"});
};

exports.respondInternalError = (error, req, res, next) => {
  //Catch all errors and respond with a 500 status code.
  let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
  console.log(`ERROR occurred: ${error.stack}`);
  res.status(errorCode);

  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
};
