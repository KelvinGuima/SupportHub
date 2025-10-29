const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Categoria = sequelize.define('Categoria', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'categorias',
  timestamps: true
});

module.exports = Categoria;