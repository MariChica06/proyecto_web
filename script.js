// --- Variables principales ---
const agregarBtn = document.getElementById("agregarBtn");
const nombreInput = document.getElementById("nombreInput");
const listaNombres = document.getElementById("listaNombres");
const mensaje = document.getElementById("mensaje");

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
// Generar grupos 
document.addEventListener("DOMContentLoaded", () => {
    const inputIntegrante = document.getElementById("nombreGruposInput");
    const btnAgregarIntegrante = document.getElementById("btnAgregarIntegrante");
    const nombresLista = document.getElementById("nombresLista");
    const tamanoInput = document.getElementById("tamanoGrupo");
    const generarBtn = document.getElementById("generarGruposBtn");
    const limpiarBtn = document.getElementById("limpiarGrupoBtn");
    const gruposResultado = document.getElementById("gruposResultado");

    let integrantes = [];

    // Agregar integrante a la lista
    btnAgregarIntegrante.addEventListener("click", () => {
        const nombre = inputIntegrante.value.trim();
        if (nombre !== "") {
            integrantes.push(nombre);
            inputIntegrante.value = "";
            mostrarIntegrantes();
        }
    });

    // Mostrar la lista de integrantes
    function mostrarIntegrantes() {
        nombresLista.innerHTML = integrantes.map(n => `<li>${n}</li>`).join("");
    }

    // Generar grupos aleatorios según el tamaño indicado
    generarBtn.addEventListener("click", () => {
        const tamano = parseInt(tamanoInput.value);
        if (isNaN(tamano) || tamano <= 0) {
            alert("Ingresa un tamaño de grupo válido");
            return;
        }

        if (integrantes.length === 0) {
            alert("No hay integrantes para dividir en grupos");
            return;
        }

        const grupos = crearGruposAleatorios(integrantes, tamano);
        mostrarGrupos(grupos);
    });

    // Función para crear los grupos
    function crearGruposAleatorios(lista, tamanoGrupo) {
        const copia = [...lista];
        copia.sort(() => Math.random() - 0.5);

        const grupos = [];
        while (copia.length > 0) {
            grupos.push(copia.splice(0, tamanoGrupo));
        }

        return grupos;
    }

    // Mostrar los grupos en pantalla
    function mostrarGrupos(grupos) {
        gruposResultado.innerHTML = grupos.map((grupo, i) => `
            <div>
                <strong>Grupo ${i + 1}</strong>
                <ul>
                    ${grupo.map(nombre => `<li>${nombre}</li>`).join("")}
                </ul>
            </div>
        `).join("");
    }

    // Limpiar todo
    limpiarBtn.addEventListener("click", () => {
        integrantes = [];
        nombresLista.innerHTML = "";
        gruposResultado.innerHTML = "";
        inputIntegrante.value = "";
        tamanoInput.value = "";
    });
});
/*Calculadora */