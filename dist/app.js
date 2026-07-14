import fs from 'node:fs';
import path from 'node:path';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { apiRouter } from './routes/index.js';
export const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: env.frontendUrl }));
app.use(express.json({ limit: '100kb' }));
app.use('/api', apiRouter);
const frontendIndex = path.join(env.frontendDistPath, 'index.html');
if (fs.existsSync(frontendIndex)) {
    app.use(express.static(env.frontendDistPath, { index: false }));
    app.use((request, response, next) => {
        if (request.method !== 'GET' ||
            request.path === '/api' ||
            request.path.startsWith('/api/') ||
            !request.accepts('html'))
            return next();
        return response.sendFile(frontendIndex);
    });
}
app.use((_request, response) => response.status(404).json({ message: 'Rota não encontrada' }));
app.use(errorHandler);
