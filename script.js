// --- Variables principales ---
const agregarBtn = document.getElementById("agregarBtn");
const nombreInput = document.getElementById("nombreInput");
const listaNombres = document.getElementById("listaNombres");
const mensaje = document.getElementById("mensaje");
const generarGruposBtn = document.getElementById('generarGruposBtn');
const tamanoGrupo = document.getElementById('tamanoGrupo');
const gruposResultado = document.getElementById('gruposResultado');

let nombres = [];

// --- Agregar nombre ---
agregarBtn.addEventListener("click", () => {
    const nombre = nombreInput.value.trim();

    if (nombre === "") {
        if (mensaje) mensaje.textContent = " ¡Por favor, escribe un nombre! ";
        return;
    }
    if (mensaje) mensaje.textContent = "";

    nombres.push(nombre);
    mostrarNombres();
    nombreInput.value = "";
    nombreInput.focus();
});

// --- Mostrar nombres en la lista ---
function mostrarNombres() {
    listaNombres.innerHTML = '';
    nombres.forEach((nombre, idx) => {
        const li = document.createElement("li");

        // Crear <span> con el nombre
        const spanNombre = document.createElement("span");
        spanNombre.textContent = nombre;

        // Crear contenedor para los botones
        const acciones = document.createElement("div");
        acciones.classList.add("acciones");

        // Botón Eliminar
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.classList.add("eliminar");
        eliminarBtn.addEventListener("click", () => {
            nombres.splice(idx, 1);
            mostrarNombres();
            if (mensaje) {
                mensaje.textContent = `${spanNombre.textContent} ha sido eliminado.`;
                setTimeout(() => mensaje.textContent = "", 2000);
            }
        });

        // Botón Editar
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.classList.add("editar");
        editarBtn.addEventListener("click", () => {
            const nuevoNombre = prompt("Nuevo nombre:", spanNombre.textContent);
            if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
                if (mensaje) {
                    mensaje.textContent = `${spanNombre.textContent} ha sido cambiado a: " ${nuevoNombre.trim()} ".`;
                    setTimeout(() => mensaje.textContent = "", 2000);
                }
                nombres[idx] = nuevoNombre.trim();
                mostrarNombres();
            }
        });

        acciones.appendChild(eliminarBtn);
        acciones.appendChild(editarBtn);

        li.appendChild(spanNombre);
        li.appendChild(acciones);
        listaNombres.appendChild(li);
    });
}

// --- Generar grupos aleatorios ---
generarGruposBtn.addEventListener('click', () => {
    const tamano = parseInt(tamanoGrupo.value);
    if (nombres.length < tamano) {
        gruposResultado.innerHTML = '<p style="color:red;">No hay suficientes nombres para formar un grupo.</p>';
        return;
    }
    // Mezclar nombres aleatoriamente
    const mezclados = [...nombres].sort(() => Math.random() - 0.5);
    const grupos = [];
    for (let i = 0; i < mezclados.length; i += tamano) {
        grupos.push(mezclados.slice(i, i + tamano));
    }
    mostrarGrupos(grupos);
});

function mostrarGrupos(grupos) {
    gruposResultado.innerHTML = '';
    grupos.forEach((grupo, idx) => {
        const div = document.createElement('div');
        div.innerHTML = `<strong>Grupo ${idx + 1}:</strong> ${grupo.join(', ')}`;
        gruposResultado.appendChild(div);
    });
}

// --- Calculadora ---
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

// --- Tablas de multiplicar ---
function generarTabla() {
    const numero = parseInt(document.getElementById('numero').value);
    const resultado = document.getElementById('result');
    resultado.innerHTML = ''; // Limpia antes de generar

    if (isNaN(numero)) {
        resultado.innerHTML = '<p style="color:red;">Por favor, ingresa un número válido.</p>';
        return;
    }

    for (let i = 1; i <= 12; i++) {
        resultado.innerHTML += `${numero} x ${i} = ${numero * i}<br>`;
    }
}

function limpiar() {
    document.getElementById('numero').value = '';
    document.getElementById('result').innerHTML = '';
}