import express from "express";
import { config } from "dotenv";
import { emailRoutes } from "./routes";
config();
const app = express();

// middlewares
app.use(express.json());

// routes
app.use('/api', emailRoutes);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT}`);
});