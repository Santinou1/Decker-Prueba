import express, { Router, Request, Response } from 'express';
import { CommetController } from '../controllers/commet.controller';

const router: Router = express.Router();
const commetController = new CommetController();

// Obtener todos los commets
router.get('/commets', async (req: Request, res: Response) => {
  await commetController.getAllCommets(req, res);
});

// Crear nuevos commets
router.post('/commets', async (req: Request, res: Response) => {
  await commetController.createCommets(req, res);
});

// Limpiar base de datos
router.delete('/commets', async (req: Request, res: Response) => {
  await commetController.clearDatabase(req, res);
});

export default router;
