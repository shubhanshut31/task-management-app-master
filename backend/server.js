require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Ensure 'cors' package is installed and imported
mongoose.connect(process.env.DATABASE_URL);

const app = express();
const db = mongoose.connection;

// --- CORRECTED CORS CONFIGURATION ---
// You MUST include the protocol (https:// or http://) for the origins to be valid.
app.use(cors({
    origin: [
        "https://task-management-app-master-6yt4-3pjh6iuru.vercel.app", // This is the frontend origin that needs access
        "https://task-management-app-master.vercel.app",
        "http://localhost:3002" // This might be for testing or a base URL, but it should also have the protocol
    ],
     credentials: true,
}));
// ------------------------------------

app.use(express.json());

db.on("error", (err) => console.log(err));
db.on("open", () => console.log("DATABASE_CONNECTED"));

const tasRouter = require("./routes/tasks");
app.get("/api/tasks", tasRouter);



app.listen(process.env.PORT, () => console.log(`server is listening at port ${process.env.PORT}`));
