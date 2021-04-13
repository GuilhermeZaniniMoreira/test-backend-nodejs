import { Router } from 'express';

import authRoutes from './modules/Auth/routes';
import categoryRoutes from './modules/Category/routes';
import productRoutes from './modules/Product/routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/category', categoryRoutes);
routes.use('/product', productRoutes);

export default routes;
