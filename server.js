const express = require("express");
require("dotenv").config();
const dbConnect = require("./configs/dbConnect");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const allowedOrigin = 'http://localhost:5173';

const app = express();
app.use(express.json());

app.use(cors({
  origin: allowedOrigin,      
  credentials: true          
}));

app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{
    console.log("Server is listening on PORT", PORT);
    dbConnect();
});