import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import { setApiRoutes } from './routes/apiRoutes';
import { connectDb } from './config/mongodb';

const app = express();
const PORT = process.env.PORT || 3000;

// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'API Docs',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./src/routes/apiRoutes.ts'],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());

// Connect to MongoDB
connectDb();

// Set up routes 
setApiRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
