import express from "express";
import { config } from "dotenv";
import routes from "./routes";
config();
const app = express();

// middlewares
app.use(express.json());

// routes
app.use('/api', routes);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT}`);
});