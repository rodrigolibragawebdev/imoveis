import { app } from './app.js';
import { env } from './config/env.js';
import './database/seed.js';
app.listen(env.port, () => {
    console.log(`Casa em Pauta API disponível em http://localhost:${env.port}/api`);
});
