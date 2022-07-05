// npm i jwt-decode react-google-login bcrypt jsonwebtoken
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from'dotenv';

import postRoutes from './routes/posts.route.js';
import userRoutes from './routes/user.route.js';


const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());                                                                                        // NEEDS TO BE ABOVE APP.USE ROUTES

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

const ATLAS_URL = process.env.ATLAS_URL || 'mongodb+srv://ayfantis53:And3flip%23@memories-cluster.7mde2mu.mongodb.net/?retryWrites=true&w=majority' ;
const PORT = process.env.PORT || 5000;

mongoose.connect(ATLAS_URL)
    .then(() => app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); }))
    .catch((error) => console.log( error.message ));