import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connection from './database/index.js';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log('Servidor rodando na porta ', process.env.PORT);
});

app.get('/get', (req, res) => {res.json({message: 'hello world'})});

const startServer = async () => {
    await connection.sync({ alter: true });
    console.log('Banco de dados conectado e sincronizado.');
};

startServer();

export default app;