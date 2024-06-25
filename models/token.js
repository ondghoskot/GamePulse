const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true },
    deletedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Token", tokenSchema);
