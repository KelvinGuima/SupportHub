const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Resposta = sequelize.define('Resposta', {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  texto: { type: DataTypes.TEXT, allowNull: false }
}, {
  tableName: 'respostas',
  timestamps: true
});

module.exports = Resposta;