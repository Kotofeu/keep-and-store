import express from "express";
import cors from "cors";
import itemsRouter from "./routes/items";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// Маршруты
app.use("/api/items", itemsRouter);

// Обработка ошибок
app.use(errorHandler);

export default app;
