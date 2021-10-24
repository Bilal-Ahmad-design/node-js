const AppError = require('./../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);
  const message = `Duplicate field value: ${value}. please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Invalid token please login with correct credentials', 401);

const hadleJWTExpiredError = (err) =>
  new AppError('Your token has expired please try again', 401);

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  // B) renderd website
  console.error('Error...error', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: Send message to the client
    if (err.isOperational) {
      // renderd website
      return res.status(err.statusCode).json('error', {
        title: 'Something went wrong',
        msg: err.message,
      });
    }
    // B)Programming or other unknown error: don't leak the details to the client
    // 1) Log the error
    // renderd website
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong',
      msg: 'Please try again later ',
    });
  }
  // B) RENDERED WEBSITE
  // A) Operational, trusted error: Send message to the client

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak the details to the client
  // 1) Log the error
  console.error('Error...error', err);
  return res.status(500).json({
    status: 'errror',
    message: 'something went very wrong...',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'CastError') error = handleCastErrorDB(error);

    if (error.name === 11000) error = handleDuplicateFieldsDB(error);

    if (error.name === 'ValidatorError') error = handleValidationErrorDB(error);

    if (err.name === 'JsonWebTokenError') error = handleJWTError(error);

    if (error.name === 'TokenExpiredError') error = hadleJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};
