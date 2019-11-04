const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    purchaseZipCode: {
        type: String
    },
    notes: {
        type: String
    },
    lastContacted: {
        type: String
    },
    birthday: {
        type: String
    },
    status: {
        type: String,
        default: "Interested" //Interested - Ready - On Hold
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("contact", ContactSchema);
