import express from "express";
import cors from "cors";
import 'dotenv/config'
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";
import path from "path"

const app = express();
const port = process.env.PORT || 4000
await connectDB();
await connectCloudinary();

const _dirname = path.resolve();

const allowedOrigins = ['http://localhost:5173']

app.post('/stripe', express.raw({type: 'application/json'}, stripeWebhooks))

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}))

// API Endpoints
app.get('/', (req, res)=> res.send("API Working"))
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.use(express.static(path.join(_dirname,"/client/dist")))
app.get('*', (_,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"))
})

app.listen(port, ()=> console.log(`Server started on PORT:${port}`));