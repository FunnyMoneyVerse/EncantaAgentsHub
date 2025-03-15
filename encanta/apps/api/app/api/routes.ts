import express from 'express';
import { Request, Response } from 'express';

const router = express.Router();

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Version endpoint
router.get('/version', (req: Request, res: Response) => {
    res.json({ version: '0.1.0' });
});

// TODO: Add more API routes here

export default router; 