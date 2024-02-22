import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: "Book",
    },

    quantity: {
        type: Number,
        trim: true,
    },
    price: {
        type: Number,

    }


});

const Order = mongoose.model('Order', orderSchema);

export default Order