const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,   // Reference to the user who owns the property
        ref: "User", 
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    bedrooms: {
        type: Number,
        required: true,
        default: 1
    },
    bathrooms: {
        type: Number,
        required: true,
        default: 1
    },
    beds: {
        type: Number,
        required: true,
        default: 1
    },
    price: {
        type: Number,
        required: true
    },
    perks: {
        type: String,
        required: true
    },
    extrainfo: {
        type: String,
        required: true
    },
    maxGuest: {
        type: Number,
        required: true,
        default: 1
    },
    images: { 
        type: [String], 
        required: true 
    }
}, 
{ timestamps: true });

module.exports = mongoose.model("Property", PropertySchema);