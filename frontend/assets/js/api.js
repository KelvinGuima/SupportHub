const API_URL = "http://localhost:3000/api";

export async function login(email, senha) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição de login:", error);
    return { message: "Erro de conexão com o servidor" }
  }
}