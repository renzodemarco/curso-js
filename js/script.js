// Declaro dos variables que se irán modificando de acuerdo a lo que haga el usuario
let listaPacientes;
let IDseleccionado;


// Declaro las variables del DOM
const modalNuevoPaciente = document.getElementById("modalNuevoPaciente"),
    cancelNuevoPaciente = document.getElementById("cancelNuevoPaciente"),
    agregarNuevoPaciente = document.getElementById("agregarNuevoPaciente"),
    confirmarNuevoPaciente = document.getElementById("confirmarNuevoPaciente"),
    confirmarCambiosPaciente = document.getElementById("confirmarCambiosPaciente"),
    contenedorLista = document.getElementById("contenedorLista"),
    inputBuscar = document.getElementById("inputBuscar"),
    selectBuscar = document.getElementById("selectBuscar"),
    nombrePacNuevo = document.getElementById("nombrePacNuevo"),
    propPacNuevo = document.getElementById("propPacNuevo"),
    especiePacNuevo = document.getElementById("especiePacNuevo"),
    sexoPacNuevo = document.getElementById("sexoPacNuevo"),
    edadPacNuevo = document.getElementById("edadPacNuevo"),
    razaPacNuevo = document.getElementById("razaPacNuevo"),
    pesoPacNuevo = document.getElementById("pesoPacNuevo"),
    historiaPacNuevo = document.getElementById("historiaPacNuevo"),
    nuevoPacienteForm = document.getElementById("nuevoPacienteForm"),
    modalPacActual = document.getElementById("modalPacActual"),
    cerrarPacActual = document.getElementById("cerrarPacActual"),
    imgPacActual = document.getElementById("imgPacActual"),
    nombrePacActual = document.getElementById("nombrePacActual"),
    propPacActual = document.getElementById("propPacActual"),
    sexoPacActual = document.getElementById("sexoPacActual"),
    edadPacActual = document.getElementById("edadPacActual"),
    razaPacActual = document.getElementById("razaPacActual"),
    pesoPacActual = document.getElementById("pesoPacActual"),
    historiaPacActual = document.getElementById("historiaPacActual");


// Creo una clase para mis objetos Paciente, a cada uno se le asignará un número de id random
class Paciente {
    constructor(nombre, propietario, especie, sexo, edad, raza, peso, historia) {
        this.nombre = nombre;
        this.propietario = propietario;
        this.especie = especie;
        this.sexo = sexo;
        this.edad = edad;
        this.raza = raza;
        this.peso = peso;
        this.historia = historia;
        this.id = Math.round(Math.random() * 100000)
    }
}

// Función que me crea objetos de la clase Paciente y los pushea en mi array de pacientes
function agregarPaciente(nombre, propietario, especie, sexo, edad, raza, peso, historia) {
    let nuevoPaciente = new Paciente(nombre, propietario, especie, sexo, edad, raza, peso, historia);
    listaPacientes.push(nuevoPaciente);
}

// Función que me muestra la lista de pacientes en el navegador
function actualizarPacientes(lista) {
    contenedorLista.innerHTML = "";
    lista.forEach((paciente, indice) => {
        nuevoPaciente = document.createElement("li");
        nuevoPaciente.classList.add("list-group-item", "d-flex", "align-items-center", "paciente-en-lista");
        nuevoPaciente.innerHTML =
            `<div class="especie-img">
            <img src=${imgPaciente(paciente)}>
        </div>
        <div class="ms-2 me-auto">
            <div class="nombre-paciente fw-bold">${paciente.nombre}</div>
            <div class="nombre-propietario">${paciente.propietario}</div>
        </div>
        <button class="btn-primary" id="botonObservar${indice}" title="Ver paciente">
            <img src="./img/ver.svg"></img>
        </button>
        <button class="btn-secondary" id="botonModificar${indice}" title="Editar paciente">
            <img src="./img/editar.svg"></img>
        </button>
        <button class="btn-danger" id="botonEliminar${indice}" title="Eliminar paciente">
            <img src="./img/eliminar.svg"></img>
        </button>`
        contenedorLista.appendChild(nuevoPaciente);

        // Acá accedo a cada botón mediante su índice para agregarle un EventListener a cada uno
        let botonObservar = document.getElementById(`botonObservar${indice}`);
        let botonModificar = document.getElementById(`botonModificar${indice}`);
        let botonEliminar = document.getElementById(`botonEliminar${indice}`)

        botonObservar.addEventListener("click", () => {
            verPaciente(paciente);
        });

        botonModificar.addEventListener("click", () => {
            IDseleccionado = paciente.id;
            verModificarPaciente(paciente);
        })

        botonEliminar.addEventListener("click", () => {
            IDseleccionado = paciente.id;
            confirmarEliminacion(IDseleccionado);
        })
    })
}

// Función que me abre un modal mostrando la info del paciente seleccionado
function verPaciente(paciente) {
    abrirModal(modalPacActual);
    imgPacActual.src = imgPaciente(paciente);
    nombrePacActual.innerHTML = paciente.nombre || "Sin información";
    propPacActual.innerHTML = paciente.propietario || "Sin información";
    sexoPacActual.innerHTML = paciente.sexo || "Sin información";
    edadPacActual.innerHTML = paciente.edad || "Sin información";
    razaPacActual.innerHTML = paciente.raza || "Sin información";
    pesoPacActual.innerHTML = paciente.peso || "Sin información";
    historiaPacActual.innerHTML = paciente.historia || "Sin información";
}

// Función que me abre un modal para modificar el paciente seleccionado
function verModificarPaciente(paciente) {
    abrirModal(modalNuevoPaciente);
    nombrePacNuevo.value = paciente.nombre;
    propPacNuevo.value = paciente.propietario;
    especiePacNuevo.value = paciente.especie;
    sexoPacNuevo.value = paciente.sexo;
    edadPacNuevo.value = paciente.edad;
    razaPacNuevo.value = paciente.raza;
    pesoPacNuevo.value = paciente.peso;
    historiaPacNuevo.value = paciente.historia;
    confirmarNuevoPaciente.classList.add("hidden");
    confirmarCambiosPaciente.classList.remove("hidden");
}

// Función que dispara un alert en el que el usuario confirma si desea eliminar a un paciente
function confirmarEliminacion(id) {
    Swal.fire({
        icon: "warning",
        title: "¿Desea eliminar este paciente?",
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonColor: 'rgba(75, 21, 126, 0.810)',
        cancelButtonText: 'Cancelar'
    }).then(result => {
        if (result.isConfirmed) {
            eliminarPaciente(id);
            guardarEnStorage(listaPacientes);
            actualizarPacientes(listaPacientes);
            Swal.fire({
                title: 'Paciente eliminado',
                icon: 'success',
                confirmButtonColor: 'rgba(75, 21, 126, 0.810)',
                confirmButtonText: "Aceptar"
            })
        }
    })
}

// Función para eliminar pacientes mediante su id
function eliminarPaciente(id) {
    for (i = 0; i < listaPacientes.length; i++) {
        listaPacientes[i].id === id && listaPacientes.splice(i, 1);
    }
}

// Función para guardar info en el localStorage
function guardarEnStorage(lista) {
    localStorage.setItem("storagePacientes", JSON.stringify(lista))
}

// Función que le asigna al paciente una imagen de perro o gato según su especie
function imgPaciente(paciente) {
    return paciente.especie == "Felino" ? "./img/felino.svg" : "./img/canino.svg";
}

// Función que cambia clases para mostrar los divs ocultos
function abrirModal(modal) {
    modal.classList.replace("hidden", "show");
    modal.style.animation = "aparecer .5s";
}

// Función que cambia clases para ocultar los divs visibles
function cerrarModal(modal) {
    modal.style.animation = "desaparecer .5s";
    setTimeout(() => modal.classList.replace("show", "hidden"), 500);
}

// Función que verifica si un input tiene contenido
function verificarInput(input) {
    return typeof input.value === "string" && input.value.trim().length > 0;
}

// Función que muestra un alert de que falta contenido en los inputs
function faltanDatos() {
    Swal.fire({
        title: 'Por favor, complete los campos obligatorios',
        icon: 'error',
        confirmButtonText: "Entendido"
    })
}

// Función que cambia la class de los inputs vacíos para que el borde sea rojo
function colorearInputsVacios(inputs) {
    inputs.forEach(input => {
        (!verificarInput(input)) ? input.classList.add("incompleto"): input.classList.remove("incompleto")
    })
}

// Función que normaliza los bordes de los inputs
function resetInputs(inputs) {
    inputs.forEach(input=> input.classList.remove("incompleto"));
}

// Función que devuelve un array con los elementos cuya propiedad contiene determinados caracteres
function filtrar(lista, caracteres, propiedad) {
    let buscarPor;
    propiedad == "Paciente" ? buscarPor = "nombre" : buscarPor = "propietario";
    let filtrado = lista.filter(paciente => paciente[buscarPor].toLowerCase().includes(caracteres.toLowerCase()));
    return filtrado;
}

// Evento para que se muestren sólo los pacientes que incluyen los caracteres que tipea el usuario
inputBuscar.addEventListener("keyup", () => {
    actualizarPacientes(filtrar(listaPacientes, inputBuscar.value, selectBuscar.value))
})

// Evento para que se muestren los pacientes con la propiedad que elige el usuario
selectBuscar.addEventListener("change", () => {
    actualizarPacientes(filtrar(listaPacientes, inputBuscar.value, selectBuscar.value))
})

// Evento para que se abra el modal que permite agregar nuevos pacientes
agregarNuevoPaciente.addEventListener("click", () => {
    abrirModal(modalNuevoPaciente);
    confirmarNuevoPaciente.classList.remove("hidden");
    confirmarCambiosPaciente.classList.add("hidden");
})

// Evento para cerrar el modal de nuevo paciente y poner en blanco todos sus inputs
cancelNuevoPaciente.addEventListener("click", () => {
    cerrarModal(modalNuevoPaciente);
    resetInputs([nombrePacNuevo, propPacNuevo, especiePacNuevo]);
    nuevoPacienteForm.reset();
})

// Evento que chequea que el paciente ingresado/modificado contenga nombre, propietario y especie para luego agregarlo a la lista de pacientes
confirmarNuevoPaciente.addEventListener("click", () => {
    colorearInputsVacios([nombrePacNuevo, propPacNuevo, especiePacNuevo]);

    if (!verificarInput(nombrePacNuevo) || !verificarInput(propPacNuevo) || !verificarInput(especiePacNuevo)) {
        faltanDatos();
    } else {
        agregarPaciente(nombrePacNuevo.value, propPacNuevo.value, especiePacNuevo.value, sexoPacNuevo.value, edadPacNuevo.value, razaPacNuevo.value, pesoPacNuevo.value, historiaPacNuevo.value);
        cerrarModal(modalNuevoPaciente);
        guardarEnStorage(listaPacientes);
        nuevoPacienteForm.reset();
        actualizarPacientes(listaPacientes);
    }
})

// Evento que chequea que el paciente ingresado/modificado contenga nombre, propietario y especie para luego modificarlo en la lista de pacientes
confirmarCambiosPaciente.addEventListener("click", () => {
    colorearInputsVacios([nombrePacNuevo, propPacNuevo, especiePacNuevo]);

    if (!verificarInput(nombrePacNuevo) || !verificarInput(propPacNuevo) || !verificarInput(especiePacNuevo)) {
        faltanDatos();
    } else {
        for (i = 0; i < listaPacientes.length; i++) {
            if (listaPacientes[i].id === IDseleccionado) {
                listaPacientes[i].nombre = nombrePacNuevo.value;
                listaPacientes[i].propietario = propPacNuevo.value;
                listaPacientes[i].especie = especiePacNuevo.value
                listaPacientes[i].sexo = sexoPacNuevo.value
                listaPacientes[i].edad = edadPacNuevo.value
                listaPacientes[i].raza = razaPacNuevo.value
                listaPacientes[i].peso = pesoPacNuevo.value
                listaPacientes[i].historia = historiaPacNuevo.value
            }
        }
        cerrarModal(modalNuevoPaciente);
        guardarEnStorage(listaPacientes);
        nuevoPacienteForm.reset();
        actualizarPacientes(listaPacientes);
    }
})

//Evento para cerrar el modal del paciente actual
cerrarPacActual.addEventListener("click", () => {
    cerrarModal(modalPacActual);
})

// Evento para que al cargar la página nos muestre un mensaje de bienvenida con una imagen obtenida a través de una API. Además, en caso de no existir info previa en el localStorage actual, hace un fetch de un archivo json agregando pacientes predeterminados.
window.addEventListener("load", () => {
    fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            let imagenRandom = data["message"];
            Swal.fire({
                title: '¡Bienvenido/a a MyVetHub!',
                imageUrl: imagenRandom,
                imageHeight: 250,
                text: 'En esta web podrás almacenar información de los pacientes de tu veterinaria para una mejor organización y seguimiento clínico.',
                confirmButtonText: "Entendido",
                confirmButtonColor: "rgba(75, 21, 126, 0.810)"
            })
        })

    listaPacientes = JSON.parse(localStorage.getItem("storagePacientes"));
    if (listaPacientes != null) {
        actualizarPacientes(listaPacientes);
    } else {
        fetch("./data/pacientes.json")
            .then(response => response.json())
            .then(data => {
                actualizarPacientes(data);
                listaPacientes = data;
            })
    }
})