const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Configuración de la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());

// Endpoint de prueba para verificar la conexión
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.send(`Conexión exitosa. Hora del servidor de base de datos: ${result.rows[0].now}`);
    client.release();
  } catch (err) {
    res.status(500).send('Error al conectar con la base de datos: ' + err.message);
  }
});

const authMiddleware = require('./middleware/authMiddleware');

// --- Endpoints de Gestión (Protegidos) ---

// Roles de administrador permitidos para acceder a estas rutas
const adminRoles = ['AdminNacional', 'SuperAdminNacional'];

// GET /api/users - Obtener todos los usuarios
app.get('/api/users', authMiddleware(adminRoles), async (req, res) => {
  try {
    const usersRes = await pool.query(
      `SELECT u.id, u.email, u.full_name, u.status, r.name as role
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id`
    );
    res.json(usersRes.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// GET /api/territories - Obtener todos los territorios
app.get('/api/territories', authMiddleware(adminRoles), async (req, res) => {
  try {
    // Esta consulta simple devuelve todos, una consulta recursiva sería mejor para jerarquía
    const territoriesRes = await pool.query('SELECT * FROM territories ORDER BY name');
    res.json(territoriesRes.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// POST /api/users/:userId/territories - Asignar un territorio a un usuario
app.post('/api/users/:userId/territories', authMiddleware(adminRoles), async (req, res) => {
  const { userId } = req.params;
  const { territoryId } = req.body;

  if (!territoryId) {
    return res.status(400).json({ error: 'El ID del territorio es requerido.' });
  }

  try {
    await pool.query(
      'INSERT INTO user_territories (user_id, territory_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [userId, territoryId]
    );
    res.status(201).json({ message: 'Territorio asignado correctamente.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al asignar el territorio.' });
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
