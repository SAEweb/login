const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});


const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();  // Evita la recarga de la página

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password }),
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else {
        const mensaje = await response.text();
        alert(mensaje);  // Si hay un error, se muestra
      }
    } catch (error) {
      console.error(error);
      alert("Error en la conexión con el servidor.");
    }
  });
}


app.get('/api/user', (req, res) => {
  if (req.session.user) {
    res.json({ usuario: req.session.user.usuario });
  } else {
    res.status(401).json({ error: 'No autorizado' });
  }
});
