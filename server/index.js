import express from "express";
const app = express();
import cors from "cors";
import pool from "./db.js";
import profileRouter from "./routes/profileRoutes.js"
import recipeRouter from "./routes/recipeRoutes.js"
import cookbookRouter from "./routes/cookbookRoutes.js"
app.use(cors());
app.use(express.json());

app.use("/profile",profileRouter)
app.use("/recipes",recipeRouter)
app.use("/cookbooks",cookbookRouter)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
});

process.on('SIGINT', () => {
    console.log("Received SIGINT. Closing server gracefully...");
    server.close(() => {
        console.log("Server closed.");
        pool.end(); // Ensure DB connections are closed
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log("Received SIGTERM. Closing server gracefully...");
    server.close(() => {
        console.log("Server closed.");
        pool.end(); // Ensure DB connections are closed
        process.exit(0);
    });
});