import mongoose from "mongoose";


export const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },

  userDetail:{
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
  },

  address: {
    province: { type: String, required: true },
    district: { type: String, required: true },
    street: { type: String, required: true },
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      image: { type: String, required: false }
    }
  ],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }

},{timestamps:true});

const Order = mongoose.model('Order',orderSchema);

export default Order;



