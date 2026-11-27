/**
 * services/profile.service.js
 * ---------------------------------------------------------------------------
 * The SERVICE layer owns data access. Nothing here knows about HTTP - no req,
 * no res, no status codes. That separation is the whole point:
 *
 *   route      -> "which URL am I?"
 *   controller -> "read the request, send the response"
 *   service    -> "fetch or change the data"
 *
 * Right now the data lives in a JSON file. In Week 8 this file is the ONLY one
 * that changes: `readFile` is replaced by `Profile.findOne()` from Mongoose and
 * the controller above it keeps working untouched. That is why we split it.
 * ---------------------------------------------------------------------------
 */

import { readFile } from 'node:fs/promises';
import path from 'node:path';

import config from '../config/env.js';

const PROFILE_FILE = path.join(config.paths.data, 'profile.json');

/**
 * Read the whole profile document.
 * @returns {Promise<object>} the parsed profile
 */
export async function getProfile() {
  const raw = await readFile(PROFILE_FILE, 'utf-8');
  return JSON.parse(raw);
}

/**
 * Read just the skills array.
 * @returns {Promise<Array<{name: string, level: string, week: number}>>}
 */
export async function getSkills() {
  const profile = await getProfile();
  return profile.skills;
}

/**
 * Read just the projects array.
 * @returns {Promise<Array<object>>}
 */
export async function getProjects() {
  const profile = await getProfile();
  return profile.projects;
}
