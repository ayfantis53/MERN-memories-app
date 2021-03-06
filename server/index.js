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

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const mongoAtlasURL = process.env.ATLAS_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(mongoAtlasURL)
    .then(() => app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`); }))
    .catch((error) => console.log( error.message ));