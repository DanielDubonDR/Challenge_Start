import { Router } from 'express';
import {
    configureMock,
    getAllMocks,
    getMockById,
    updateMock,
    deleteMock,
    getMockStats,
    searchMocks
} from '../controllers/mock.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas de configuración de mocks
router.post('/', authenticate, configureMock);
router.get('/', authenticate, getAllMocks);
router.get('/stats', authenticate, getMockStats);
router.get('/search', authenticate, searchMocks);
router.get('/:id', authenticate, getMockById);
router.put('/:id', authenticate, authorize('admin'), updateMock);
router.delete('/:id', authenticate, authorize('admin'), deleteMock);

export default router;