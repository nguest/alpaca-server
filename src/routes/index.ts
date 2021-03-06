import { Router } from 'express';
import AuthRouter from './Auth';
import AppRouter from './App';
import AlertsRouter from './Alerts';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/auth', AuthRouter);
router.use('/alerts', AlertsRouter);
router.use('/', AppRouter);

// Export the base-router
export default router;
