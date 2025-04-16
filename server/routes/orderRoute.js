import express from 'express'
import authUser from '../middleware/authUser.js';
import { getAllOrders, getUserOrders, PlaceOrderCOD, PlaceOrderStripe } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, PlaceOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.post('/stripe', authUser, PlaceOrderStripe)

export default orderRouter;