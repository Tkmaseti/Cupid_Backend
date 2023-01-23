// const mongoose = require('mongoose')
module.exports = mongoose => {
    var orders = mongoose.Schema({
        userId: { type: String, required: true },
        products: [
        {
            productId: {type: String,},
            quantity: {type: Number, default: 1,},
        },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
    },
    {timestamps: true});
    orders.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Order = mongoose.model("Order", orders)
    return Order;
}