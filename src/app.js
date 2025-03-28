import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import productosRoutes from './routes/productosRoutes.js';
import carritosRoutes from './routes/carritosRoutes.js';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);
const PORT = 3000;

app.engine('hbs', engine({
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://papeschifranco:q6z4GGA4XXAa9uNP@clusterbasedatos.apbom.mongodb.net/finalproyect?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/productos', productosRoutes);
app.use('/carritos', carritosRoutes);

app.get('/', (req, res) => {
    res.render('home', { titulo: 'Bienvenido a la API de Productos y Carritos' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export { io };