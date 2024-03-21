const app= require("./app")
const mongoose=require("mongoose")
const config=require("./config/config")

mongoose.connect(config.mongoose.url ,config.mongoose.options)
.then(()=> console.log("Connected to MongoDb",config.mongoose.url))
.catch((err)=> console.log(err))

app.listen(config.port,()=>{
    console.log("Listening to port",config.port) 
})