const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Chamado = sequelize.define('Chamado', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  descricao: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('aberto','em_progresso','fechado'), defaultValue: 'aberto' }
}, {
  tableName: 'chamados',
  timestamps: true
});

module.exports = Chamado;