// const mongoose = require('mongoose')
module.exports = mongoose => {
    var products = mongoose.Schema({
        title: String,
        description: String,
        price: Number,
        category: String,
        image: String,
    }, {timestamps: true});
    products.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Product = mongoose.model("Products", products)
    return Product;
}