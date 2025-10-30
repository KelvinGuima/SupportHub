import dotenv from "dotenv";

dotenv.config();

const env = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: "0123",
  DB_NAME: process.env.DB_NAME,
  DB_PORT: 3306, // porta do banco
  SERVER_PORT: 3000, // porta do servidor
  JWT_SECRET: process.env.JWT_SECRET,
};

console.log(env)

export default env;
