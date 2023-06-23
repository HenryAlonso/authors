const mongoose = require('mongoose')
const AuthorsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [
                true,
                "Name is required"
            ],
            minLength: [
                3,
                "Name must be at least 3 characters long"
            ],
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Author', AuthorsSchema);