import express from "express";
import { config } from "dotenv";
config();
const app = express();

// middlewares
app.use(express.json());

// routes
// app.use('/api', );

const PORT = process.env.PORT || 4004
app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT}`)
});