require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
mongoose.connect(process.env.DATABASE_URL);

const app = express();
const db = mongoose.connection;
app.use(cors({
  origin: ["https://task-management-app-master-6yt.vercel.app/"]
  })
);
app.use(express.json());
db.on("error",(err)=>console.log(err));
db.on("open",()=>console.log("DATABASE CONNECTED"));

const tasRouter = require("./routes/tasks");
app.use("/api/tasks",tasRouter)



app.get('/', (req, res) => {
  res.send('Hello, World!'); // Sends a simple text response
});

app.listen(process.env.PORT,()=>console.log(`server is listening at port ${process.env.PORT}`));
