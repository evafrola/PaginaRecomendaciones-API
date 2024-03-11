const express = require('express');
const cors = require('cors')
const reviewRouter = require("./routes/reviewRoutes");
const { PORT } = require("./config.js");

require('./config.js');

const app = express();

app.use(express.json());
app.use(cors()); 

app.use("/review", reviewRouter);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint no encontrado'
    })
});
  
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});