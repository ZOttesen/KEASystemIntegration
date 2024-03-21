import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    webhook: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;