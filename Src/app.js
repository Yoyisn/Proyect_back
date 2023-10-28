const taskRoutes = require('./Routes/tasks.routes.js');
const authRoutes = require('./Routes/auth.routes.js');
const cookieParser = require('cookie-parser');

const morganDev = require('morgan');
const express = require('express');
const corsDev = require('cors');

const morgan = morganDev();
const cors = corsDev();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(morgan('dev'));

app.use(express.json());

app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", taskRoutes);

module.exports = app;