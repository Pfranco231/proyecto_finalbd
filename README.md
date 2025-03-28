# API de Productos y Carritos

Este proyecto es una API RESTful para la gestión de productos y carritos de compra, construida con Node.js y Express. Permite realizar operaciones CRUD sobre productos y gestionar carritos de compra.

## Estructura del Proyecto

```
api-productos-carritos
├── src
│   ├── app.js
│   ├── controllers
│   │   ├── productosController.js
│   │   └── carritosController.js
│   ├── routes
│   │   ├── productosRoutes.js
│   │   └── carritosRoutes.js
│   ├── models
│   │   ├── producto.js
│   │   └── carrito.js
│   ├── middlewares
│   │   └── authMiddleware.js
│   └── utils
│       └── db.js
├── package.json
├── .env
└── README.md
```

## Requisitos

- Node.js
- MongoDB

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del proyecto:
   ```
   cd api-productos-carritos
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Configura las variables de entorno en el archivo `.env`:
   ```
   MONGODB_URI=<TU_URI_DE_MONGODB>
   ```

## Ejecución

Para iniciar el servidor, ejecuta el siguiente comando:
```
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

## Endpoints

### Productos

- `GET /api/productos`: Lista todos los productos.
- `GET /api/productos/:id`: Obtiene un producto por su ID.
- `POST /api/productos`: Agrega un nuevo producto.
- `PUT /api/productos/:id`: Actualiza un producto existente.
- `DELETE /api/productos/:id`: Elimina un producto.

### Carritos

- `POST /api/carritos`: Crea un nuevo carrito.
- `GET /api/carritos/:id/productos`: Lista los productos en un carrito.
- `POST /api/carritos/:id/productos`: Agrega un producto a un carrito.
- `PUT /api/carritos/:id/productos/:productoId`: Actualiza un producto en un carrito.
- `DELETE /api/carritos/:id/productos/:productoId`: Elimina un producto de un carrito.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.