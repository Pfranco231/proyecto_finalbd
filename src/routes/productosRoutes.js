import express from 'express';
import ProductosController from '../controllers/productosController.js';
import Producto from '../models/productoModel.js';
import { io } from '../app.js'; // Importar Socket.IO

const router = express.Router();
const productosController = new ProductosController(Producto);

router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.render('productos/productos', { titulo: 'Gestión de Productos', productos });
    } catch (error) {
        console.error('Error al cargar productos:', error);
        res.status(500).send('Error al cargar productos');
    }
});

router.post('/', async (req, res) => {
    try {
        const producto = await productosController.agregarProducto(req, res);
        io.emit('producto-agregado', producto); // Emitir evento de WebSocket
        res.status(201).send('Producto agregado');
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).send('Error al agregar producto');
    }
});

router.delete('/:code', async (req, res) => {
    try {
        const productoEliminado = await productosController.eliminarProducto(req, res);
        io.emit('producto-eliminado', productoEliminado); // Emitir evento de WebSocket
        res.status(200).send('Producto eliminado');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).send('Error al eliminar producto');
    }
});

router.put('/:code', async (req, res) => {
    try {
        const productoActualizado = await productosController.modificarProducto(req, res);
        io.emit('producto-modificado', productoActualizado); // Emitir evento de WebSocket
        res.status(200).send('Producto modificado');
    } catch (error) {
        console.error('Error al modificar producto:', error);
        res.status(500).send('Error al modificar producto');
    }
});

export default router;