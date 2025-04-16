import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'user' },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'product' },
      quantity: { type: String, required: true },
    }
  ],
  amount: { type: String, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'address' },
  status: { type: String, default: 'Order Placed' },
  paymentType: { type: String, required: true },
  isPaid: { type: Boolean, default: false, required: true },
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model('order', orderSchema);
export default Order;