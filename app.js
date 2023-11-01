import express from "express";
import { config } from "dotenv";
import path from "path";

const app = express();

config({
    path: "./data/config.env",
});

app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index');
})
export default app;