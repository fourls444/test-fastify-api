-- สร้างตาราง products ถ้ายังไม่มี
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,      -- ตั้งค่า id เป็น SERIAL เพื่อให้เป็น Auto-increment
    name TEXT NOT NULL,         -- ชื่อสินค้า
    price INTEGER DEFAULT 0     -- ราคาสินค้า (ใช้ INTEGER ตามภาพตัวอย่างของคุณ)
);

-- เพิ่มข้อมูลเริ่มต้นตามภาพตัวอย่าง
INSERT INTO products (name, price) VALUES ('bomb', 20);
INSERT INTO products (name, price) VALUES ('car', 100);
INSERT INTO products (name, price) VALUES ('tank', 250);
INSERT INTO products (name, price) VALUES ('banana', 900);