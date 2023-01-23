// const mongoose = require('mongoose')
module.exports = mongoose => {
    var carts = mongoose.Schema({
        userId: String,
        products: {
            productId: String,
            quantity: {type: Number, default: 1}
        }
    },
    {timestamps: true});
    carts.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Cart = mongoose.model("Cart", carts)
    return Cart;
}