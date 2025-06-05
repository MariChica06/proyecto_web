const agregarBtn = document.getElementById("agregarBtn");
const nombreInput = document.getElementById("nombreInput");
const listaNombres = document.getElementById("listaNombres");
const mensaje = document.getElementById("mensaje");

agregarBtn.addEventListener("click", () => {
    const nombre = nombreInput.value.trim();
    
    if (nombre === "") {
        mensaje.textContent = " ¡Por favor, escribe un nombre! ";
        return;
    }
    mensaje.textContent = "";
    // Crear <li>
    const li = document.createElement("li");
    // Crear <span> con el nombre
    const spanNombre = document.createElement("span");
    spanNombre.textContent = nombre;
    // Crear contenedor para los botones
    const acciones = document.createElement("div");
    acciones.classList.add("acciones");
    // Crear botón Eliminar
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.classList.add("eliminar");
    // Crear botón Editar
    const editarBtn = document.createElement("button");
    editarBtn.textContent = "Editar";
    editarBtn.classList.add("editar");
    // Agregar botones al contenedor
    acciones.appendChild(eliminarBtn);
    acciones.appendChild(editarBtn);
    // Agregar nombre y botones al li
    li.appendChild(spanNombre);
    li.appendChild(acciones);
    // Agregar <li> a la lista
    listaNombres.appendChild(li);
    // Limpiar input
    nombreInput.value = "";
    nombreInput.focus();
    // Funcionalidad eliminar
    eliminarBtn.addEventListener("click", () => {
        li.remove();
    });

    eliminarBtn.addEventListener("click", () => {
        mensaje.textContent = `${spanNombre.textContent} ha sido eliminado.`;
        setTimeout(() => {
                mensaje.textContent = "";
            }, 2000);
    })
    // Funcionalidad editar
    editarBtn.addEventListener("click", () => {
        const nuevoNombre = prompt("Nuevo nombre:", spanNombre.textContent);
        if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
            mensaje.textContent = `${spanNombre.textContent} ha sido cambiado a: " ${nuevoNombre.trim()} ".`;
            spanNombre.textContent = nuevoNombre.trim();
            setTimeout(() => {
                mensaje.textContent = "";
            }, 2000);
        }
    });
});

const display = document.getElementById('display');
function add(value) {
    display.value += value;
}
function clearDisplay() {
    display.value = '';
}
function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = 'Error 😕';
    }
}