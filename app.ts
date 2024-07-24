import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/connect';
import authRoutes from './routes/auth';
import protect from './middleware/auth';
import dotenv from 'dotenv';

dotenv.config();

connectDB();

const app: Application = express();

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.get('/api/wallet', protect, (req: Request, res: Response) => {
  res.json({
    username: req.user?.username,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
