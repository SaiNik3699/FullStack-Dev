/**
 * server.js - the entry point of the backend
 * ---------------------------------------------------------------------------
 * WEEK 1 ROLE
 * This file exists so Monday's lesson ("client, server, HTTP, DNS") is
 * something you can watch instead of just read about. Start it, open the page,
 * and every request the browser makes prints a line in your terminal.
 *
 * The reading order of this file is the lifetime of a request:
 *
 *   1. logger          - note that a request arrived
 *   2. express.json    - if the body is JSON, parse it
 *   3. /api routes     - does an API endpoint answer this URL?
 *   4. static files    - is there an HTML/CSS file with this name?
 *   5. notFound        - nothing matched -> 404
 *   6. errorHandler    - anything threw -> one JSON error shape
 *
 * Express runs these in the exact order they are registered below.
 * ---------------------------------------------------------------------------
 */

import express from 'express';

import config from './config/env.js';
import apiRoutes from './routes/index.js';
import requestLogger from './middleware/requestLogger.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

/* -- 1. Logging ----------------------------------------------------------- */
app.use(requestLogger);

/* -- 2. Body parsing ------------------------------------------------------ */
// Turns a JSON request body into a normal JS object on `req.body`.
// Week 1 has no POST routes yet, but every later week needs this.
app.use(express.json());

/* -- 3. API routes -------------------------------------------------------- */
// Everything under /api is data (JSON), never HTML. Keeping the API on its own
// prefix is what later lets React live on one domain and the API on another.
app.use('/api', apiRoutes);

/* -- 4. Static files ------------------------------------------------------ */
// Serves the whole /client folder. A request for "/" sends client/index.html,
// "/contact.html" sends that file, "/css/main.css" sends the stylesheet.
// In Week 5 this folder becomes a React build output - the line stays the same.
app.use(express.static(config.paths.client));

// Markdown notes and the request diagram, readable at /docs/...
app.use('/docs', express.static(config.paths.docs));

/* -- 5 & 6. Fallbacks ----------------------------------------------------- */
app.use(notFound);
app.use(errorHandler);

/* -- Start listening ------------------------------------------------------ */
app.listen(config.port, () => {
  console.log('');
  console.log('  Week 1 server is running');
  console.log('  ------------------------------------------');
  console.log(`  Bio page      http://localhost:${config.port}/`);
  console.log(`  Contact page  http://localhost:${config.port}/contact.html`);
  console.log(`  API profile   http://localhost:${config.port}/api/profile`);
  console.log(`  API health    http://localhost:${config.port}/api/health`);
  console.log(`  Mode          ${config.nodeEnv}`);
  console.log('  ------------------------------------------');
  console.log('  Requests will appear below as they arrive.');
  console.log('');
});

export default app;
