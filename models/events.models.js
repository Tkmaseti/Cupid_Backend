// const mongoose = require('mongoose')
module.exports = mongoose => {
    var events = mongoose.Schema({
        title: String,
        image: String,
        about: String,
        eventUrl: String
    },
    {timestamps: true});
    events.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Event = mongoose.model("events", events)
    return Event;
}