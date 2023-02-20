// const mongoose = require('mongoose')
module.exports = mongoose => {
    const user = new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        image: {
            type: String,
            required: false,
            default: 'https://i.postimg.cc/Hk2LqXPS/02th-egg-person.jpg'
        },
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }]
    })
    user.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model('users', user)

    return User
    
}


// module.exports = User