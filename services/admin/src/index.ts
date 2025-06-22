import express from "express";
import { config } from "dotenv";
import apiRoutes from "./routes";
// import { connect } from "../src/utils/rabbitmq";
config();
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 4004
app.listen(PORT, async () => {
    console.log(`App is running at PORT ${PORT}`);
    // await connect();
    // console.log('RabbitMQ conncted');
});