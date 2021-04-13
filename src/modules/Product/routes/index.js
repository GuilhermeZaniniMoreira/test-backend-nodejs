  
import { Router } from 'express';
import ProductController from '../controllers/ProductController';

import authMiddleware from '../../../shared/middlewares/authMiddleware';

const productRoutes = Router();

productRoutes.post('/', authMiddleware, ProductController.store);
productRoutes.get('/', authMiddleware, ProductController.index);
productRoutes.put('/', authMiddleware, ProductController.update);
productRoutes.delete('/', authMiddleware, ProductController.delete);

export default productRoutes;
