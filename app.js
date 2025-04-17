// const sign_in_btn = document.querySelector("#sign-in-btn");
// const sign_up_btn = document.querySelector("#sign-up-btn");
// const container = document.querySelector(".container");

// sign_up_btn.addEventListener("click", () => {
//   container.classList.add("sign-up-mode");
// });

// sign_in_btn.addEventListener("click", () => {
//   container.classList.remove("sign-up-mode");
// });


const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

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
        const msg = await response.text();
        alert(msg);
      }
    } catch (err) {
      console.error("Error al conectar:", err);
      alert("Ocurrió un error al iniciar sesión.");
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
