class CarritosController {
    constructor(carritoModel, productoModel) {
        this.carritoModel = carritoModel;
        this.productoModel = productoModel;
    }

    async listarCarritos(req, res) {
        try {
            const carritos = await this.carritoModel.find();
            const productos = await this.productoModel.find();
    
            const carritosConTotales = carritos.map(carrito => ({
                ...carrito.toObject(),
                productos: carrito.productos.map(producto => ({
                    ...producto,
                    total: producto.precio * producto.cantidad,
                    nombre: producto.nombre 
                }))
            }));
    
            res.render('carritos/carritos', { titulo: 'Gestión de Carritos', carritos: carritosConTotales, productos });
        } catch (error) {
            console.error('Error en listarCarritos:', error);
            res.status(500).send('Error al listar carritos');
        }
    }

    async crearCarrito(req, res) {
        const { productos } = req.body;
        try {
            const productosSeleccionados = await Promise.all(
                productos.map(async (p) => {
                    const producto = await this.productoModel.findOne({ code: p.code });
                    if (!producto) throw new Error(`Producto con código ${p.code} no encontrado`);
                    return {
                        code: producto.code,
                        nombre: producto.title,
                        precio: producto.price,
                        cantidad: p.cantidad
                    };
                })
            );

            const total = productosSeleccionados.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

            const nuevoCarrito = new this.carritoModel({ productos: productosSeleccionados, total });
            const carritoGuardado = await nuevoCarrito.save();
            return carritoGuardado;
        } catch (error) {
            console.error('Error al crear carrito:', error);
            throw error;
        }
    }


    async eliminarCarrito(req, res) {
        const { id } = req.params;
        try {
            const carritoEliminado = await this.carritoModel.findByIdAndDelete(id);
            if (!carritoEliminado) throw new Error('Carrito no encontrado');
            return carritoEliminado;
        } catch (error) {
            console.error('Error al eliminar carrito:', error);
            throw error;
        }
    }
}

export default CarritosController;