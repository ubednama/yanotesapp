import connectToMongo from './db/db.connection.js';
import express from 'express';
import auth from './routes/auth.js'
import notes from './routes/note.js'
import dotenv from 'dotenv';

dotenv.config();

connectToMongo();

const app = express();
app.use(express.json())

const port = process.env.PORT || 3000;

app.use('/api/auth', auth)
app.use('/api/notes', notes)

app.listen(port, () => {
    console.log("App listening on PORT", port);
})
