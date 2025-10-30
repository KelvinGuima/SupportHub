import bcrypt from "bcrypt";

export const hashPassword = async (senha) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(senha, salt);
};

export const comparePassword = async (senha, hash) => {
  return await bcrypt.compare(senha, hash)
}