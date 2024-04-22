const express = require('express');
const bodyParser = require('body-parser');
const {connectToMongoDB } = require('./db/dataB')
require('dotenv').config();
const { userRouter } = require('./routes/userRoutes');
const PORT = process.env.PORT || 4000; 

const app = express ();
connectToMongoDB();

app.use(bodyParser.json());
app.use(express.urlencoded({
    extended:true
}));

app.use("/", userRouter);
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})