# ใช้ Node.js version 18
FROM node:18-alpine

# สร้างโฟลเดอร์ทำงานใน Container
WORKDIR /app

# ก๊อปปี้ไฟล์ package.json เพื่อติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# ก๊อปปี้โค้ดทั้งหมดเข้า Container
COPY . .

# เปิด Port 3000
EXPOSE 3000

# สั่งรัน server.js
CMD ["node", "server.js"]