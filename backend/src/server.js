import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './database/index.js';
import authRoutes from './routes/AuthRoutes.js';
import teamRoutes from './routes/TeamRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import './models/associations.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta ', process.env.PORT);
});

app.use('/auth', authRoutes);
app.use('/team', teamRoutes);
app.use('/user', userRoutes);

const startServer = async () => {
    await connection.sync();
    console.log('Banco de dados conectado e sincronizado.');
};

startServer();

export default app;