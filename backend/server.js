import app from "./src/app.js";
import env from "./src/config/dotenv.js";

app.listen(env.SERVER_PORT, () => {
  console.log(`Servidor rodando em http://localhost:${env.SERVER_PORT}`);
  console.log('DB_HOST:', env.DB_HOST);
  console.log('DB_USER:', env.DB_USER);
  console.log('DB_PASSWORD:', env.DB_PASSWORD);
  console.log('DB_NAME:', env.DB_NAME);
  console.log('DB_PORT:', env.DB_PORT);
  console.log('JWT_SECRET:', env.JWT_SECRET);
});

