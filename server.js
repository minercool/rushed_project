const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const session = require('express-session')


dotenv.config()
app.use(express.json())
app.use(cors({origin : '*'}));


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: null }
}))

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('database connected successfully')
    }
})

app.use('/report',require('./Controller/reportController'))
app.use('/user',require('./Controller/userController'))
app.use('/auth',require('./Controller/authController'))
app.listen(3000, () => {
    console.log("listening on port 3000")
})