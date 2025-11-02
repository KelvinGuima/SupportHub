import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Usuario from "./Usuario.js";
import Chamado from "./Chamado.js";

const Resposta = sequelize.define("Resposta", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  mensagem: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: "respostas",
  timestamps: false,
});

// Relações
Resposta.belongsTo(Usuario, { foreignKey: "usuario_id" });
Resposta.belongsTo(Chamado, { foreignKey: "chamado_id" });

export default Resposta;
