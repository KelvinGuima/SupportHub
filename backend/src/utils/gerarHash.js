import bcrypt from "bcrypt";

const senha = "minhasenha123"; // a senha que você quer usar
const hash = await bcrypt.hash(senha, 10);
console.log(hash);
