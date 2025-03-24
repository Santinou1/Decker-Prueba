import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import commetRoutes from './routes/commet.routes';

// Initialize Express app and Prisma client
const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', commetRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
