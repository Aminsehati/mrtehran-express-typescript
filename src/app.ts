import express, { Express } from 'express'
import Routes from './routes/index';
import dotenv from 'dotenv'
import database from './db/database'
const app = express();



dotenv.config();
database();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


Routes(app);


app.listen(5000, () => {
    console.log('start running server');
})