/**
 * config/env.js
 * ---------------------------------------------------------------------------
 * One place that reads environment variables and gives every setting a safe
 * default. Nothing else in the app touches `process.env` directly.
 *
 * Why bother?  Because in Week 12 this same app gets deployed to Render, and
 * there the PORT is chosen by the hosting provider, not by you. Reading config
 * from the environment is what lets the exact same code run on your laptop and
 * on a real server.
 *
 * To load a .env file, start the server with:
 *     node --env-file=.env server/server.js
 * (Node 20.6+ has this built in, so we need no extra package.)
 * ---------------------------------------------------------------------------
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

// In ES modules there is no __dirname, so we rebuild it from import.meta.url.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The project root is one level up from /server/config -> /server -> /
const ROOT_DIR = path.resolve(__dirname, '..', '..');

export const config = {
  /** Port the HTTP server listens on. */
  port: Number(process.env.PORT) || 3000,

  /** "development" on your laptop, "production" once deployed. */
  nodeEnv: process.env.NODE_ENV || 'development',

  /** Absolute paths, so the server works no matter where you run it from. */
  paths: {
    root: ROOT_DIR,
    client: path.join(ROOT_DIR, 'client'),
    docs: path.join(ROOT_DIR, 'docs'),
    data: path.join(ROOT_DIR, 'server', 'data'),
  },
};

export default config;
