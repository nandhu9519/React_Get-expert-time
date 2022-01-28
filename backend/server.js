const express =require('express');
const dotenv = require('dotenv');
const app = express();
const db = require("./config/connections");
const cors = require('cors')
dotenv.config();
const connectDb = require ('./config/connections')
const userRoutes = require('./routes/usersRoutes')
// database connecetion
db.connect((err) => {
    if (err) console.log("Connection error" + err);
    else console.log("Database connected to port 27017");
  });
app.use(express.json())  
app.use(
  cors()
);
app.use('/users/api',userRoutes)

const PORT = process.env.PORT || 8000;

app.listen(PORT,console.log(`Server connected to port ${PORT}`))
