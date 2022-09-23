import express from 'express';
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';

import {PORT} from './config'

const app = express();

app.use(express.json());

app.use(indexRoutes);

app.use('/api', employeesRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "No found"
    })
})

export default app;