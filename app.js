const express= require("express");
const mongoose = require('mongoose');
const mainRoutes = require('./routes/index');

const app = express();

const {PORT = 3001} = process.env;

app.use('/', mainRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use(express.json());
app.use("/", mainRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});