import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http'; // Necesario para usar Socket.IO con Express
import productosRoutes from './routes/productosRoutes.js';
import carritosRoutes from './routes/carritosRoutes.js';

const app = express();
const server = http.createServer(app); // Crear un servidor HTTP
const io = new SocketIOServer(server); // Configurar Socket.IO
const PORT = 3000;

// Configurar Handlebars con acceso a propiedades heredadas
app.engine('hbs', engine({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect("mongodb+srv://papeschifranco:q6z4GGA4XXAa9uNP@clusterbasedatos.apbom.mongodb.net/finalproyect?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Rutas
app.use('/productos', productosRoutes);
app.use('/carritos', carritosRoutes);

// Ruta principal
app.get('/', (req, res) => {
    res.render('home', { titulo: 'Bienvenido a la API de Productos y Carritos' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Configuración de WebSockets
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Escuchar eventos personalizados si es necesario
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export { io }; // Exportar para usar en otros archivos