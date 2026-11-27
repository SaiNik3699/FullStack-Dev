/**
 * routes/index.js
 * ---------------------------------------------------------------------------
 * Collects every feature router under a single /api prefix, so server.js only
 * ever has to mount ONE thing. When Week 9 adds authentication you add one
 * line here (`router.use('/auth', authRoutes)`) and nothing else moves.
 * ---------------------------------------------------------------------------
 */

import { Router } from 'express';

import profileRoutes from './profile.routes.js';

const router = Router();

/**
 * GET /api/health
 * A "is the server alive?" endpoint. Every deployed app should have one -
 * Render and Railway use exactly this kind of URL to check your service.
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

router.use('/profile', profileRoutes);

export default router;
