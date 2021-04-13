  
import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRoutes = Router();

productRoutes.post('/', ProductController.store);
productRoutes.get('/', ProductController.index);
productRoutes.put('/', ProductController.update);
productRoutes.delete('/', ProductController.delete);

export default productRoutes;
