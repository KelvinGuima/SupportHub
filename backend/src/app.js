import express from "express"
import routes from "./routes/index.js";
import cors from "cors"
// import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Healthcheck
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handler
// app.use(errorHandler);

export default app;