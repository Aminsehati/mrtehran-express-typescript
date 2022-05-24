import express, { Express } from 'express'
import Routes from './routes/index';
import dotenv from 'dotenv'
import database from './db/database'
import cors from 'cors'
const app = express();
import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.json';
const swaggerDocument = require('./swagger.json')

dotenv.config();
database();
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

Routes(app);


app.listen(5000, () => {
  console.log('start running server');
})