import dotenv from "dotenv";
dotenv.config();
import https from "https";
import fs from "fs";
import app from "./app";

const PORT = process.env.PORT || 8001;

// Чтение сертификатов для HTTPS
const options = {
  key: fs.readFileSync("./certificates/localhost-key.pem"),
  cert: fs.readFileSync("./certificates/localhost.pem"),
};

// Запуск HTTPS-сервера
https.createServer(options, app).listen(PORT, () => {
  console.log(`🚀 Backend server running at https://localhost:${PORT}`);
});
