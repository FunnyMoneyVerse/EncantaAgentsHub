import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Encanta API' });
});

// Import API routes
import apiRoutes from './api/routes';
app.use('/api', apiRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app; 