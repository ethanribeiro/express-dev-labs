const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skillSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Professional", "Master"],
        required: true,
    },
    experience: {
        type: Date,
        default: function () {
            return new Date();
        },
        required: true,
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Skill", skillSchema);