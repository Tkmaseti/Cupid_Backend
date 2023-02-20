// const mongoose = require('mongoose')
module.exports = mongoose => {
    var gifts = mongoose.Schema({
        title: String,
        image: String,
        about: String,
        size: String,
        giftUrl: String
    },
    {timestamps: true});
    gifts.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Gift = mongoose.model("gifts", gifts)
    return Gift;
}