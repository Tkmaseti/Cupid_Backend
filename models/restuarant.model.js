// const mongoose = require('mongoose')
module.exports = mongoose => {
    var restuarants = mongoose.Schema({
        title: String,
        image: String,
        about: String,
        rate: Number,
        restuarantUrl: String
    },
    {timestamps: true});
    restuarants.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Restuarant = mongoose.model("restuarants", restuarants)
    return Restuarant;
}