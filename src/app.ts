import express from "express";
import cors from "cors";
import Stripe from "stripe";
import morgan from "morgan";
import connectDB from "./utils/features.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import userRoute from "./routes/user.js";
import ordertRoute from "./routes/order.js";
import productRoute from "./routes/products.js";
import peymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";

const port = process.env.PORT || 3000;

config({ path: "./.env" });
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
connectDB(mongoURI);
export const myCache = new NodeCache();
export const stripe = new Stripe(stripeKey);

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is Calling");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", ordertRoute);
app.use("/api/v1/payment", peymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is working on this http://localhost:${port} `);
});
