import app from "./app.js";

app.listen(process.env.PORT, ()=>{
    console.log(`Server is working at Port : ${process.env.PORT}`)
})
