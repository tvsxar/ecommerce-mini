const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');
const sql = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging
app.use('/api/products', productRoutes);

async function initDBConnection() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `

        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

initDBConnection()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})