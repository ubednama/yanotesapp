import connectToMongo from './db/db.connection.js';
import express from 'express';
import auth from './routes/auth.js'
import noteOperations from './routes/note.js'
import notes from './routes/notes.js'
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';

dotenv.config();

connectToMongo();

const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors())

const port = process.env.PORT || 3000;

app.use('/api/auth', auth)
app.use('/api/notes', noteOperations)
app.use("/", notes)

app.listen(port, () => {
    console.log("App listening on PORT", port);
})