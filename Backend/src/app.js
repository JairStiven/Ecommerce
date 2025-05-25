const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const pool = require('./config/db.js');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Importar rutas
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const productRoutes = require('./routes/productRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const orderDetailsRoutes = require('./routes/orderDetailsRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js'); // ✅ Rutas de categorías
const configRoutes = require('./routes/configRoutes.js');     // ✅ Ruta de configuración
const adminRoutes = require('./routes/adminRoutes.js');       // ✅ Ruta de administrador
const reportesRoutes = require('./routes/reportesRoutes.js'); // ✅ Ruta de reportes en PDF

// Verificación de rutas cargadas
console.log({
    authRoutes,
    userRoutes,
    productRoutes,
    orderRoutes,
    paymentRoutes,
    cartRoutes,
    orderDetailsRoutes,
    categoryRoutes,
    configRoutes,
    adminRoutes,
    reportesRoutes
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order-details', orderDetailsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/config', configRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reportes', reportesRoutes); // ✅ Reportes PDF

// Ruta de prueba
app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT NOW() AS ahora');
        res.send({ message: 'Servidor funcionando', server_time: rows[0].current_time });
    } catch (error) {
        console.error('Error en la base de datos:', error);
        res.status(500).json({ message: 'Error en la conexión con la base de datos', error });
    }
});



// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});