/**
 * middleware/notFound.js
 * ---------------------------------------------------------------------------
 * Runs only when no route and no static file matched the URL.
 *
 * Express tries middleware in the order you register them, so this one is
 * registered LAST. Reaching it means "nothing on this server answers to that
 * address" - which is exactly what HTTP status 404 means.
 * ---------------------------------------------------------------------------
 */

export function notFound(req, res, next) {
  // Build an Error object and hand it to the error handler via next(error).
  // Passing an argument to next() tells Express: "skip ahead to error handling".
  const error = new Error(`Not found - ${req.method} ${req.originalUrl}`);
  error.status = 404;
  next(error);
}

export default notFound;
