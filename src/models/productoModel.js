import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    thumbnails: {
        type: [String], // Array de strings para las imágenes
        default: []
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Producto = mongoose.model('Producto', productoSchema);

export default Producto;