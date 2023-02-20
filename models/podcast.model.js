// const mongoose = require('mongoose')
module.exports = mongoose => {
    var podcasts = mongoose.Schema({
        title: String,
        image: String,
        podcastUrl: String
    },
    {timestamps: true});
    podcasts.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const Podcast = mongoose.model("podcasts", podcasts)
    return Podcast;
}