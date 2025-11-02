async function carregarComponente(caminho, seletor) {
  try {
    const resposta = await fetch(caminho);
    if (!resposta.ok) throw new Error(`Erro ao carregar: ${caminho}`);
    const html = await resposta.text();
    document.querySelector(seletor).innerHTML = html;
  } catch (erro) {
    console.error("Falha ao carregar componente:", erro);
  }
}

document.addEventListener("DOMContentLoaded", async () => {

  const headerContainer = document.querySelector("#header-container");
  if (headerContainer) {
    await carregarComponente("../components/header.html", "#header-container");


    const userData = JSON.parse(localStorage.getItem("user"));
    const userNome = userData?.nome || "Usuário";
    const userNomeEl = document.getElementById("user-name");
    if (userNomeEl) userNomeEl.textContent = userNome;


    const profileIcon = document.getElementById("profile-icon");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const logoutBtn = document.getElementById("logout-btn");

    if (profileIcon && dropdownMenu) {
      profileIcon.addEventListener("click", (e) => {
        e.stopPropagation(); 
        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
      });

      window.addEventListener("click", () => {
        dropdownMenu.style.display = "none";
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/auth/login.html";
      });
    }
  }

  const sidebarContainer = document.querySelector("#sidebar-container");
  if (sidebarContainer) {
    await carregarComponente("../components/sidebar.html", "#sidebar-container");
  }

});

function logoutUsuario() {
  localStorage.clear();
  window.location.href = "../pages/login.html";
}

function verificarAutenticacao() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "../pages/login.html";
}
