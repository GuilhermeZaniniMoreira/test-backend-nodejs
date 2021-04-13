  
import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const categoryRoutes = Router();

categoryRoutes.post('/', CategoryController.store);
categoryRoutes.get('/', CategoryController.index);
categoryRoutes.put('/', CategoryController.update);
categoryRoutes.delete('/', CategoryController.delete);

export default categoryRoutes;
