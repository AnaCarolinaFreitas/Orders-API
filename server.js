require("dotenv").config();
const express = require("express");
const cors = require("cors");
const orderRoutes = require("./src/routes/orderRoutes");
const clientRoutes = require("./src/routes/clientRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/clients", clientRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
