import { Router } from 'express';
import { executeMock } from '../controllers/mock.controller.js';

const router = Router();

// Ejecucion de mocks
router.use((req, res, next) => {
    executeMock(req, res, next);
});

export default router;