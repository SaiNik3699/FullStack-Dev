/**
 * middleware/requestLogger.js
 * ---------------------------------------------------------------------------
 * Prints one line per incoming HTTP request. This is the Monday lesson made
 * visible: every time the browser asks for a file, a line appears here.
 *
 * A middleware is just a function with three arguments: (req, res, next).
 *   req  - what the client sent us   (method, url, headers, body)
 *   res  - what we will send back    (status code, headers, body)
 *   next - "I'm done, pass it along to the next middleware"
 *
 * Forgetting to call next() is the classic beginner bug: the request hangs
 * forever because nobody ever answers it.
 * ---------------------------------------------------------------------------
 */

export function requestLogger(req, res, next) {
  const startedAt = Date.now();

  // 'finish' fires once the response has been fully sent to the browser,
  // so by then we know the status code and how long the whole trip took.
  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    const line = [
      new Date().toISOString(),
      req.method.padEnd(6),      // GET, POST, ...
      String(res.statusCode),    // 200, 404, 500, ...
      `${durationMs}ms`.padEnd(7),
      req.originalUrl,
    ].join('  ');

    console.log(line);
  });

  next();
}

export default requestLogger;
