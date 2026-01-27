require('dotenv').config(); // โหลดค่าจากไฟล์ .env
const fastify = require('fastify')({ logger: true });
const { Pool } = require('pg');

// 1. ตั้งค่าการเชื่อมต่อ PostgreSQL โดยดึงค่าจาก Process Environment
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// --- ROUTES ---

// [GET] ดึงข้อมูลสินค้าทั้งหมด
fastify.get('/products', async (request, reply) => {
  const { rows } = await pool.query('SELECT * FROM products ORDER BY id ASC');
  return rows;
});

// [POST] เพิ่มสินค้าใหม่
fastify.post('/products', async (request, reply) => {
  const { name, price } = request.body;
  
  const result = await pool.query(
    'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
    [name, price] 
  );
  
  reply.code(201).send(result.rows[0]);
});

// [PUT] แก้ไขข้อมูลสินค้าตาม ID
fastify.put('/products/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, price } = request.body;
  const result = await pool.query(
    'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
    [name, price, id]
  );
  
  if (result.rowCount === 0) {
    return reply.status(404).send({ error: 'Product not found' });
  }
  return result.rows[0];
});

// [DELETE] ลบสินค้าตาม ID
fastify.delete('/products/:id', async (request, reply) => {
  const { id } = request.params;
  const result = await pool.query('DELETE FROM products WHERE id = $1', [id]);
  
  if (result.rowCount === 0) {
    return reply.status(404).send({ error: 'Product not found' });
  }
  return { message: `Product with ID ${id} has been deleted` };
});

// --- START SERVER ---
const start = async () => {
  try {
    const port = process.env.PORT || 3000;
    await fastify.listen({ port: port, host: '0.0.0.0' });
    console.log(`Server is running at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();