/**
 * routes/profile.routes.js
 * ---------------------------------------------------------------------------
 * A ROUTER is a small, self-contained map of "URL + HTTP method -> handler".
 * It deliberately contains no logic: each line reads like a sentence.
 *
 *   GET /api/profile/skills  ->  profileController.getSkills
 * ---------------------------------------------------------------------------
 */

import { Router } from 'express';

import * as profileController from '../controllers/profile.controller.js';

const router = Router();

// Order matters in Express: more specific paths go above the general one.
router.get('/skills', profileController.getSkills);
router.get('/projects', profileController.getProjects);
router.get('/', profileController.getProfile);

export default router;
