const express = require('express');
const morgan = require("morgan");
const tourRouter = require('./routers/tourRouter')
const userRouter = require('./routers/userRouter')
const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`))

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}

app.use((req,res,next) => {
    let date = new Date().toLocaleDateString();
    let time = new Date().toTimeString();
    req.requestTime = date + " "+time;
    next();
})

 /*

app.get("/api/v1/tours",getAllTour)

app.get("/api/v1/tours/:id",getTour)

app.patch("/api/v1/tours/:id",updateTour)

app.delete("/api/v1/tours/:id",deleteTour)

app.post("/api/v1/tours",createTour)

*/
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tours",tourRouter);

module.exports = app;