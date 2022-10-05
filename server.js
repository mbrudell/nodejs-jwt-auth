import express, {json, urlencoded} from 'express';
import 'dotenv/config'
import cors from 'cors'

const app = express();
app.use(json());
app.use(urlencoded({extended: true}));

var corsOptions = {
    origin: "http://localhost:4444"
};

app.use(cors())

app.get('/', (req, res) => {
    res.json({message: 'Karibu KE'})
})

import authRoutes from './app/routes/auth.routes.js'
app.use('', authRoutes)

import userRoutes from './app/routes/user.routes.js'
app.use('', userRoutes)

const PORT = 3333 || 8080;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});