import express from 'express';
import { addPackage, getPackages } from '../controllers/tracking.controller.ts';

const router = express.Router();

router.post('/add-package', addPackage);
router.get('/get-packages', getPackages);

export default router;
