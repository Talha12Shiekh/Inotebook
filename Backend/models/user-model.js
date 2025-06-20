import mongoose from 'mongoose';
const { Schema } = mongoose;

let validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    password: { type: String, minLength: 6, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);