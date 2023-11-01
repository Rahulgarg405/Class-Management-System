import app from "./app.js";

// const port = 4000;
app.listen(process.env.PORT, ()=>{
    console.log(`Server is working at Port : ${process.env.PORT}`)
})
