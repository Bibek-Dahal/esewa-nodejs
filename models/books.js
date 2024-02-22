import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        trim: true,
        unique: true,
    },

    description: {
        type: String,
        trim: true,
    },


    price: {
        type: String,
    },

    image: {
        type: String,
    },
});

const Book = mongoose.model('Book', bookSchema);

export default Book