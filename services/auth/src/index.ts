import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes";
config();
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser())

// routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 4004
app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT}`)
});