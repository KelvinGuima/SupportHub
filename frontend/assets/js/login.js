import { login } from "./api.js"

const form = document.getElementById("loginForm");
const errorMsg = document.getElementById("errorMsg")

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const senha = form.senha.value;

  const resposta = await login(email, senha);

  if(resposta.token) {
    localStorage.setItem("token", resposta.token);
    localStorage.setItem("user", JSON.stringify(resposta.user));
    window.location.href = "dashboard.html"
  } else {
    errorMsg.style.display = "block";
    errorMsg.textContent = resposta.message || "E-mail ou senha incorretos."
  }
})