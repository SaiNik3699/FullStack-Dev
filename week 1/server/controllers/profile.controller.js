/**
 * controllers/profile.controller.js
 * ---------------------------------------------------------------------------
 * A CONTROLLER turns a request into a response. It asks the service layer for
 * data and decides which status code and shape to send back.
 *
 * Every handler is wrapped in try/catch and forwards failures with
 * next(error), so the error middleware is the only place that formats errors.
 * ---------------------------------------------------------------------------
 */

import * as profileService from '../services/profile.service.js';

/**
 * GET /api/profile
 * Send the full profile document.
 */
export async function getProfile(req, res, next) {
  try {
    const profile = await profileService.getProfile();

    // A consistent envelope { success, data } means the frontend can always
    // check one field to know whether the call worked.
    res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/profile/skills
 * Send only the skills array, with a count for convenience.
 */
export async function getSkills(req, res, next) {
  try {
    const skills = await profileService.getSkills();
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/profile/projects
 * Send only the projects array.
 */
export async function getProjects(req, res, next) {
  try {
    const projects = await profileService.getProjects();
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    next(error);
  }
}
