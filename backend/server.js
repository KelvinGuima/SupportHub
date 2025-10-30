import app from "./src/app.js";
import env from "./src/config/dotenv.js";

app.listen(env.PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${env.PORT}`);
});
