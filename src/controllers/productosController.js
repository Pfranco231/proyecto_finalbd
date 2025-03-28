class ProductosController {
    constructor(productoModel) {
        this.productoModel = productoModel;
    }

    async listarProductos(req, res) {
        try {
            const productos = await this.productoModel.find();
            res.render('productos/listar', { titulo: 'Lista de Productos', productos });
        } catch (error) {
            console.error('Error en listarProductos:', error);
            res.status(500).send('Error al listar productos');
        }
    }

    async agregarProducto(req, res) {
        const { title, description, code, price, stock, category, thumbnails } = req.body;

        console.log('Valor de thumbnails:', thumbnails);

        const thumbnailsArray = thumbnails
            ? Array.isArray(thumbnails)
                ? thumbnails
                : thumbnails.split(',').map(url => url.trim())
            : [];

        const nuevoProducto = new this.productoModel({
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails: thumbnailsArray
        });

        try {
            const productoGuardado = await nuevoProducto.save();
            console.log('Producto guardado correctamente:', productoGuardado);
            return productoGuardado;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            throw error;
        }
    }

    async eliminarProducto(req, res) {
        const { code } = req.params;
        try {
            const productoEliminado = await this.productoModel.findOneAndDelete({ code });
            if (!productoEliminado) {
                return res.status(404).send('Producto no encontrado');
            }
            console.log('Producto eliminado:', productoEliminado);
            return productoEliminado;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }

    async modificarProducto(req, res) {
        const { code } = req.params;
        const datosActualizados = req.body;

        try {
            const productoActualizado = await this.productoModel.findOneAndUpdate(
                { code },
                datosActualizados,
                { new: true }
            );
            if (!productoActualizado) {
                return res.status(404).send('Producto no encontrado');
            }
            console.log('Producto actualizado:', productoActualizado);
            return productoActualizado;
        } catch (error) {
            console.error('Error al modificar producto:', error);
            throw error;
        }
    }
}

export default ProductosController;