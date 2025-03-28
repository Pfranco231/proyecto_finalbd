import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1
    }
});

const carritoSchema = new mongoose.Schema({
    productos: [productoSchema], // Array de productos
    total: {
        type: Number,
        default: 0
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito;