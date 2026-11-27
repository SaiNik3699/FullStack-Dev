/**
 * middleware/errorHandler.js
 * ---------------------------------------------------------------------------
 * The single place where errors turn into HTTP responses.
 *
 * Express recognises an error handler by its FOUR arguments
 * (err, req, res, next). Drop the fourth one and Express treats it as a normal
 * middleware and your errors silently stop being caught.
 * ---------------------------------------------------------------------------
 */

import config from '../config/env.js';

// eslint-disable-next-line no-unused-vars -- the 4th arg is required by Express
export function errorHandler(err, req, res, next) {
  const status = err.status || 500;

  // Server-side problems are worth printing; a simple 404 is not.
  if (status >= 500) {
    console.error('[error]', err);
  }

  res.status(status).json({
    success: false,
    error: {
      status,
      message: err.message || 'Something went wrong',
      // A stack trace helps you while developing, but leaking it in
      // production tells attackers how your code is laid out.
      ...(config.nodeEnv === 'development' && { stack: err.stack }),
    },
  });
}

export default errorHandler;
