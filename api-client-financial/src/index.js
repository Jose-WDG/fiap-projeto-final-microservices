require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const helmet = require('helmet')
const app = express();
const router = require('./routes/FinancialRoutes');

app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
app.use(helmet())
app.use("/api", router);

app.get('/', (req, res) => {
    res.send('Api de controle financeiro!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on  ${process.env.HOST}:${process.env.PORT}`);
});