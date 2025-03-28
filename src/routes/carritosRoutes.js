import express from 'express';
import CarritosController from '../controllers/carritosController.js';
import Carrito from '../models/carritoModel.js';
import Producto from '../models/productoModel.js';
import { io } from '../app.js';

const router = express.Router();
const carritosController = new CarritosController(Carrito, Producto);


router.get('/', async (req, res) => {
    try {
        await carritosController.listarCarritos(req, res);
    } catch (error) {
        console.error('Error al cargar la lista de carritos:', error);
        res.status(500).send('Error al cargar la lista de carritos');
    }
});

router.post('/', async (req, res) => {
    try {
        const carrito = await carritosController.crearCarrito(req, res);
        io.emit('carrito-creado', carrito); // Emitir evento de WebSocket
        console.log('Evento carrito-creado emitido:', carrito);
        res.status(201).json(carrito); // Devuelve el carrito creado
    } catch (error) {
        console.error('Error al crear el carrito:', error);
        res.status(500).send('Error al crear el carrito');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const carritoEliminado = await carritosController.eliminarCarrito(req, res);
        io.emit('carrito-eliminado', carritoEliminado); // Emitir evento de WebSocket
        console.log('Evento carrito-eliminado emitido:', carritoEliminado);
        res.status(200).json(carritoEliminado); // Devuelve el carrito eliminado
    } catch (error) {
        console.error('Error al eliminar el carrito:', error);
        res.status(500).send('Error al eliminar el carrito');
    }
});

export default router;