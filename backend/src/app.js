const express = require('express');
const cors = require('cors');
const {
  authRoutes,
  userRoutes,
  projectRoutes,
  taskRoutes,
  notificationRoutes,
} = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/notifications', notificationRoutes);

app.use(errorMiddleware);

module.exports = app;
