# API de Productos y Carritos

Este proyecto es una API RESTful para la gestión de productos y carritos de compra, construida con **Node.js**, **Express**, **MongoDB** y **Handlebars**. Permite realizar operaciones CRUD sobre productos y gestionar carritos de compra, con actualizaciones dinámicas en tiempo real mediante **WebSockets**.

---

## **Características**

- **Gestión de Productos**:
  - Crear, listar, modificar y eliminar productos.
  - Cada producto tiene atributos como título, descripción, código único, precio, stock, categoría e imágenes.

- **Gestión de Carritos**:
  - Crear carritos seleccionando productos existentes y especificando cantidades.
  - Modificar la cantidad de productos en un carrito.
  - Eliminar carritos.
  - Visualización del total por carrito y por producto.

- **Actualización en tiempo real**:
  - Los cambios en productos y carritos (creación, modificación, eliminación) se reflejan dinámicamente en la interfaz mediante **WebSockets**.

- **Interfaz moderna**:
  - Diseño responsivo utilizando **Bootstrap**.

---

## **Requisitos**

- **Node.js** (v14 o superior)
- **MongoDB** (local o en la nube, como MongoDB Atlas)

---

## **Instalación**

1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd api-productos-carritos