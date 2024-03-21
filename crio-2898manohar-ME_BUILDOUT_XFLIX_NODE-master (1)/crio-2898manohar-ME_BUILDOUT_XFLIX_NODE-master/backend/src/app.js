const express=require("express")
const app = express();
const router=require("./routes/index")
const cors=require("cors")
const {errorHandler}=require("./middlewares/error")
const ApiError=require("./utils/ApiError")
const httpStatus = require("http-status");

app.use(express.json());
// enable cors
app.use(cors());
app.options("*", cors());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));  

app.use("/v1",router)
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorHandler);
module.exports = app;