// src/server/db.js

import mysql from 'mysql2';

// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool({
    host: "#",
    user: "#",
    password: "#",
    database: "#"
});

// Exportar el pool para su uso en otros archivos
export default pool;


// .env EXAMPLE
/*
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret_id
AWS_REGION=your_region
AWS_NAME_BUCKET=your_bucket
*/