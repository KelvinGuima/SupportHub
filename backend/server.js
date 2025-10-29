const app = require('./src/app');
const { sequelize } = require('./src/config/db');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    // await sequelize.sync(); // habilitar conforme necessário
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

start();