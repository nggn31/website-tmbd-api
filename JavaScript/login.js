// Objeto JSON simulado para almacenar usuarios
const users = [
    { username: "jennifer", password: "12345" },
    { username: "nia", password: "12345" }
];

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".login");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

      // Verificar si el usuario y la contraseña coinciden con los almacenados
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
        alert("Inicio de sesión exitoso");
        // Aquí puedes redirigir al usuario a otra página o realizar alguna acción adicional
        window.location.href = "/index.html";
        } else {
        alert("Nombre de usuario o contraseña incorrectos");
        }
    });
});
