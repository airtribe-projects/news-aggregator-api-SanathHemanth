const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

const userRouter = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const logger = (req,res,next) =>{
    console.log(`${req.method} : Request received on ${req.url}`);
    next();
}

app.use(logger);
app.use(userRouter);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;