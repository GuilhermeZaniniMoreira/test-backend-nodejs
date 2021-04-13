  
import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/signup', AuthController.signup);
authRoutes.post('/login', AuthController.login);
authRoutes.post('/refreshToken', AuthController.generateRefreshToken);
authRoutes.post('/logout', AuthController.logout);

export default authRoutes;
