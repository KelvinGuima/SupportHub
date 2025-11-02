import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Usuario from "./Usuario.js";
import Categoria from "./Categoria.js";

const Chamado = sequelize.define("Chamado", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("aberto", "em andamento", "fechado"),
    defaultValue: "aberto",
  },
  prioridade: {
    type: DataTypes.ENUM("baixa", "média", "alta"),
    defaultValue: "média",
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  atualizado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: "chamados",
  timestamps: false,
});

// Relações
Chamado.belongsTo(Usuario, { as: "cliente", foreignKey: "id_cliente" });
Chamado.belongsTo(Usuario, { as: "suporte", foreignKey: "id_suporte" });
Chamado.belongsTo(Categoria, { foreignKey: "categoria_id" });

export default Chamado;
