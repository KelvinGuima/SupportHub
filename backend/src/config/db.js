import { Sequelize } from "sequelize";
import env from "./dotenv.js";

import Usuario from "../models/Usuario.js";
import Categoria from "../models/Categoria.js";
import Chamado from "../models/Chamado.js";
import Resposta from "../models/Resposta.js";

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {
  host: env.DB_HOST,
  dialect: "mysql",
  port: env.DB_PORT,
  logging: false, 
});

try {
  await sequelize.authenticate();
  console.log("✅ Conectado ao MySQL com Sequelize com sucesso!");
} catch (error) {
  console.error("❌ Erro ao conectar ao MySQL com Sequelize:", error.message);
}

Chamado.belongsTo(Usuario, { as: "cliente", foreignKey: "id_cliente" });
Chamado.belongsTo(Usuario, { as: "suporte", foreignKey: "id_suporte" });
Chamado.belongsTo(Categoria, { foreignKey: "categoria_id" });

Resposta.belongsTo(Usuario, { foreignKey: "usuario_id" });
Resposta.belongsTo(Chamado, { foreignKey: "chamado_id" });

const initDB = async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("Banco de dados sincronizado com sucesso!");
  } catch (error) {
    console.error("Erro ao sincronizar o banco:", error.message);
  }
};

await initDB();

export default sequelize;
