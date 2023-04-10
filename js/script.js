let listaPacientes;
let IDseleccionado;

const modalNuevoPaciente = document.getElementById("modalNuevoPaciente"),
    cancelNuevoPaciente = document.getElementById("cancelNuevoPaciente"),
    agregarNuevoPaciente = document.getElementById("agregarNuevoPaciente"),
    confirmarNuevoPaciente = document.getElementById("confirmarNuevoPaciente"),
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
    historiaPacActual = document.getElementById("historiaPacActual"),
    contenedorLista = document.getElementById("contenedorLista"),
    confirmarCambiosPaciente = document.getElementById("confirmarCambiosPaciente"),
    inputBuscar = document.getElementById("inputBuscar"),
    selectBuscar = document.getElementById("selectBuscar");


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
        this.id = Math.round(Math.random()*100000)
    }
}

function agregarPaciente(nombre, propietario, especie, sexo, edad, raza, peso, historia) {
    let nuevoPaciente = new Paciente(nombre, propietario, especie, sexo, edad, raza, peso, historia);
    listaPacientes.push(nuevoPaciente);
}

function actualizarPacientes(lista) {
    contenedorLista.innerHTML = "";

    for (const paciente of lista) {
        nuevoPaciente = document.createElement("li");
        botonObservar = document.createElement("button");
        botonModificar = document.createElement("button");
        botonEliminar = document.createElement("button");
        botonObservar.classList.add("btn-primary");
        botonModificar.classList.add("btn-secondary");
        botonEliminar.classList.add("btn-danger");
        botonObservar.innerHTML = '<img src="./img/ver.svg"></img>';
        botonObservar.setAttribute("title","Ver paciente");
        botonModificar.innerHTML = '<img src="./img/editar.svg"></img>';
        botonModificar.setAttribute("title","Modificar paciente");
        botonEliminar.innerHTML = '<img src="./img/eliminar.svg">';
        botonEliminar.setAttribute("title","Eliminar paciente");
        nuevoPaciente.classList.add("list-group-item", "d-flex", "align-items-center", "paciente-en-lista");
        nuevoPaciente.innerHTML = 
        `<div class="especie-img">
            <img src=${imgPaciente(paciente)}>
        </div>
        <div class="ms-2 me-auto">
            <div class="nombre-paciente fw-bold">${paciente.nombre}</div>
            <div class="nombre-propietario">${paciente.propietario}</div>
        </div>`
        nuevoPaciente.appendChild(botonObservar);
        nuevoPaciente.appendChild(botonModificar);
        nuevoPaciente.appendChild(botonEliminar);

        botonObservar.addEventListener("click", ()=> {
            verPaciente(paciente);
        });

        botonModificar.addEventListener("click", ()=> {
            IDseleccionado= paciente.id;
            verModificarPaciente(paciente);
        })

        botonEliminar.addEventListener("click",()=> {
            IDseleccionado = paciente.id;
            confirmarEliminacion(IDseleccionado);
        })

    contenedorLista.appendChild(nuevoPaciente);
    }
}

function eliminarPaciente(id) {
    for (i = 0; i < listaPacientes.length; i++) {
        if (listaPacientes[i].id === id) {
            listaPacientes.splice(i, 1);
            break;
        }
    }
    guardarEnStorage(listaPacientes);
}

function verPaciente(paciente) {
    abrirModal(modalPacActual);
    imgPacActual.src = imgPaciente(paciente);
    nombrePacActual.innerHTML = paciente.nombre;
    propPacActual.innerHTML = paciente.propietario;
    sexoPacActual.innerHTML = paciente.sexo;
    edadPacActual.innerHTML = paciente.edad;
    razaPacActual.innerHTML = paciente.raza;
    pesoPacActual.innerHTML = paciente.peso,
    historiaPacActual.innerHTML = paciente.historia;
}

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

function imgPaciente(paciente) {
    if (paciente.especie == "Felino") return "./img/felino.svg"
    else return "./img/canino.svg";
}

function confirmarEliminacion(id) {
    Swal.fire({
        icon: "warning",
        title: "¿Desea eliminar este paciente?",
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonColor: '#999',
        cancelButtonText: 'Cancelar'
    }).then(result=> {
        if (result.isConfirmed) {
        eliminarPaciente(id);
        actualizarPacientes(listaPacientes);
        guardarEnStorage(listaPacientes)
        Swal.fire({
            title: 'Paciente eliminado',
            icon: 'success',
            confirmButtonColor: 'rgba(75, 21, 126, 0.810)'
        })}
    })
}

function guardarEnStorage(lista) {
    localStorage.setItem("storagePacientes", JSON.stringify(lista))
}

// Función que cambia clases para mostrar los divs ocultos QUEDA!
function abrirModal(modal) {
    modal.classList.replace("hidden", "show");
    modal.style.animation = "aparecer .5s";
}

// Función que cambia clases para ocultar los divs visibles QUEDA!
function cerrarModal(modal) {
    modal.style.animation = "desaparecer .5s";
    setTimeout(() => modal.classList.replace("show", "hidden"), 500);
}

function filtrar(lista, caracteres, propiedad) {
    let buscarPor;
    propiedad == "Paciente" ? buscarPor = "nombre" : buscarPor = "propietario";
    let array = lista.filter(paciente => paciente[buscarPor].toLowerCase().includes(caracteres.toLowerCase()));
    return array;
}

function verificarInput(input) {
    return typeof input.value === "string" && input.value.trim().length > 0;
}

function inputVacios(input) {
    if (!verificarInput(input)) input.classList.add("incompleto");
    else input.classList.remove("incompleto");
}

function resetInput(...input) {
    input.classList.remove("incompleto")
}


inputBuscar.addEventListener("keyup", ()=> {
    actualizarPacientes(filtrar(listaPacientes, inputBuscar.value, selectBuscar.value))
})

selectBuscar.addEventListener("change", ()=> {
    actualizarPacientes(filtrar(listaPacientes, inputBuscar.value, selectBuscar.value))
})

agregarNuevoPaciente.addEventListener("click", ()=> {
    abrirModal(modalNuevoPaciente);
    confirmarNuevoPaciente.classList.remove("hidden");
    confirmarCambiosPaciente.classList.add("hidden");
})

cancelNuevoPaciente.addEventListener("click", ()=> {
    cerrarModal(modalNuevoPaciente);
    nuevoPacienteForm.reset();    
})

confirmarNuevoPaciente.addEventListener("click", ()=> {
    inputVacios(nombrePacNuevo);
    inputVacios(propPacNuevo);
    inputVacios(especiePacNuevo);

    if (!verificarInput(nombrePacNuevo) || !verificarInput(propPacNuevo) || !verificarInput(especiePacNuevo)) {
        Swal.fire({
            title: 'Por favor, complete los campos obligatorios',
            icon: 'error',
            confirmButtonText: "Entendido"
        })
    }

    else {
    agregarPaciente(nombrePacNuevo.value, propPacNuevo.value, especiePacNuevo.value, sexoPacNuevo.value, edadPacNuevo.value, razaPacNuevo.value, pesoPacNuevo.value, historiaPacNuevo.value);
    cerrarModal(modalNuevoPaciente);
    guardarEnStorage(listaPacientes); 
    nuevoPacienteForm.reset();
    actualizarPacientes(listaPacientes);
    }
})

cerrarPacActual.addEventListener("click", () => {
    cerrarModal(modalPacActual);
})

confirmarCambiosPaciente.addEventListener("click", ()=> {
    inputVacios(nombrePacNuevo);
    inputVacios(propPacNuevo);
    inputVacios(especiePacNuevo);

    if (!verificarInput(nombrePacNuevo) || !verificarInput(propPacNuevo) || !verificarInput(especiePacNuevo)) {
        Swal.fire({
            title: 'Por favor, complete los campos obligatorios',
            icon: 'error',
            confirmButtonText: "Entendido"
        })
    }

    else {
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
        nuevoPacienteForm.reset();
        cerrarModal(modalNuevoPaciente);
        actualizarPacientes(listaPacientes);
        guardarEnStorage(listaPacientes);
    }
})

cancelNuevoPaciente.addEventListener("click", () => {
    cerrarModal(modalNuevoPaciente);
    resetInput(nombrePacNuevo);
    resetInput(propPacNuevo);
    resetInput(especiePacNuevo);
    nuevoPacienteForm.reset();
})

window.addEventListener("load", ()=> {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response=> response.json())
    .then(data=> {
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
    } 
    else {
        fetch("./data/pacientes.json")
        .then(response=> response.json())
        .then(data=> {
            actualizarPacientes(data);
            listaPacientes = data
        })
    }
})