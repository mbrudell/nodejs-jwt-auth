import express, {json, urlencoded} from 'express';
import 'dotenv/config'

const app = express();
app.use(json());
app.use(urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({message: 'Karibu KE'})
})

const PORT = 3333 || 8080;
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
});