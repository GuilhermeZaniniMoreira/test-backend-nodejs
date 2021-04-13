  
import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

import authMiddleware from '../../../shared/middlewares/authMiddleware';

const categoryRoutes = Router();

// categoryRoutes.post('/', authMiddleware, CategoryController.store);
// categoryRoutes.get('/', authMiddleware, CategoryController.index);
// categoryRoutes.put('/', authMiddleware, CategoryController.update);
// categoryRoutes.delete('/', authMiddleware, CategoryController.delete);

categoryRoutes.post('/', CategoryController.store);
categoryRoutes.get('/', CategoryController.index);
categoryRoutes.put('/', CategoryController.update);
categoryRoutes.delete('/', CategoryController.delete);

export default categoryRoutes;
