// Primero declaro todas las variables globales que voy a utilizar:
let listaPacientes;

const cardAddPaciente = document.getElementById("cardAddPaciente"),
    sombraNuevoPaciente = document.getElementById("sombraNuevoPaciente"),
    cancelNuevoPaciente = document.getElementById("cancelNuevoPaciente"),
    agregarNuevoPaciente = document.getElementById("agregarNuevoPaciente"),
    nombrePacNuevo = document.getElementById("nombrePacNuevo"),
    propPacNuevo = document.getElementById("propPacNuevo"),
    especiePacNuevo = document.getElementById("especiePacNuevo"),
    sexoPacNuevo = document.getElementById("sexoPacNuevo"),
    edadPacNuevo = document.getElementById("edadPacNuevo"),
    razaPacNuevo = document.getElementById("razaPacNuevo"),
    pesoPacNuevo = document.getElementById("pesoPacNuevo"),
    historiaPacNuevo = document.getElementById("historiaPacNuevo"),
    contenedorCards = document.getElementById("contenedorCards"),
    nuevoPacienteForm = document.getElementById("nuevoPacienteForm"),
    sombraPacActual = document.getElementById("sombraPacActual"),
    closePacActual = document.getElementById("closePacActual"),
    imgPacActual = document.getElementById("imgPacActual"),
    nombrePacActual = document.getElementById("nombrePacActual"),
    propPacActual = document.getElementById("propPacActual"),
    sexoPacActual = document.getElementById("sexoPacActual"),
    edadPacActual = document.getElementById("edadPacActual"),
    razaPacActual = document.getElementById("razaPacActual"),
    pesoPacActual = document.getElementById("pesoPacActual"),
    historiaPacActual = document.getElementById("historiaPacActual");

// Creo la clase paciente con su constructor y un método para que le dé un "Sin información" a la propiedad cuando esta se encuentra vacía
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
    }

    verificarDatos() {
        if (this.sexo == "") this.sexo = "Sin información";
        if (this.edad == "") this.edad = "Sin información";
        if (this.raza == "") this.raza = "Sin información";
        if (this.peso == "") this.peso = "Sin información";
        if (this.historia == "") this.historia = "Sin información";
    }
}


// Función para agregar pacientes y pushearlos en el array listaPacientes
function agregarPaciente(nombre, propietario, especie, sexo, edad, raza, peso, historia) {
    let nuevoPaciente = new Paciente(nombre, propietario, especie, sexo, edad, raza, peso, historia);
    nuevoPaciente.verificarDatos();
    listaPacientes.push(nuevoPaciente);
}

// Función para que se actualice el container mostrando una carta por cada paciente
function actualizarPacientes(lista) {
    contenedorCards.innerHTML = "";

    for (const paciente of lista) {
        // Esto es un lío pero tuve que ir creando elemento por elemento ya que si agregaba todo como un innerHTML después no me permitía sumarle eventos (cosa que voy a necesitar al darle funciones de modificar o eliminar pacientes)
        const card = document.createElement("div");
        const img = document.createElement("img");
        const cardBody = document.createElement("div");
        const nombrePaciente = document.createElement("h2");
        const nombrePropietario = document.createElement("p");
        const buttonContainer = document.createElement("div");
        const botonEditar = document.createElement("button");
        const botonEliminar = document.createElement("button");
        const imgEditar = document.createElement("img");
        const imgEliminar = document.createElement("img");
        const imagen = imgPaciente(paciente);

        imgEditar.src = "./img/editar.svg";
        imgEliminar.src = "./img/eliminar.svg"

        card.classList = "card";
        img.classList = "card-img-top";
        cardBody.classList = "card-body";
        nombrePropietario.classList = "card-text";
        buttonContainer.classList = "button-container";
        botonEditar.classList = "btn btn-primary";
        botonEliminar.classList = "btn btn-danger";

        botonEditar.appendChild(imgEditar);
        botonEliminar.appendChild(imgEliminar);
        buttonContainer.appendChild(botonEditar);
        buttonContainer.appendChild(botonEliminar)
        cardBody.appendChild(nombrePaciente);
        cardBody.appendChild(nombrePropietario);
        cardBody.appendChild(buttonContainer);
        card.appendChild(img);
        card.appendChild(cardBody)

        // Acá ya voy cambiando lo que muestra cada card de acuerdo a la info del paciente
        nombrePaciente.innerHTML = paciente.nombre;
        nombrePropietario.innerHTML = paciente.propietario;
        img.src = imagen;

        // Agrego un evento para que cuando se haga click sobre la card me muestre la info en el div sombraPacActual
        card.addEventListener("click", () => {
            nombrePacActual.innerHTML = paciente.nombre;
            propPacActual.innerHTML = paciente.propietario;
            sexoPacActual.innerHTML = paciente.sexo;
            edadPacActual.innerHTML = paciente.edad;
            razaPacActual.innerHTML = paciente.raza;
            pesoPacActual.innerHTML = paciente.peso + "kg";
            historiaPacActual.innerHTML = paciente.historia;
            abrirSombra(sombraPacActual);
        })

        // Sumo cada carta al contenedor general:
        contenedorCards.appendChild(card);
    }
}

// Función para crear una card que permita seguir agregando pacientes
function agregarAddCard() {
    const addPacienteContainer = document.createElement("div");
    const cardAddPaciente = document.createElement("div");
    addPacienteContainer.classList = "add-paciente-container";
    cardAddPaciente.classList = "card add-paciente"
    cardAddPaciente.innerHTML = `<img src="./img/mas.svg" class="card-img-top">
    <div class="card-body">
        <p class="card-text">Agregar nuevo paciente</p>
    </div>`;
    addPacienteContainer.appendChild(cardAddPaciente);
    contenedorCards.appendChild(addPacienteContainer);

    // Evento para que al darle click se abra el menú de agregar nuevo paciente
    cardAddPaciente.addEventListener("click", () => {
        abrirSombra(sombraNuevoPaciente);
    })
}

// Función para guardar en localStorage
function guardarEnStorage(lista) {
    localStorage.setItem("storagePacientes", JSON.stringify(lista))
}

// Función que agrega una imagen a cada paciente de acuerdo a si es canino o felino
function imgPaciente(paciente) {
    if (paciente.especie == "Canino") return "./img/canino.svg"
    else return "./img/felino.svg";
}

// Función que cambia clases para mostrar los divs ocultos
function abrirSombra(sombra) {
    sombra.classList.replace("hidden", "show");
    sombra.style.animation = "aparecer .5s";
}

// Función que cambia clases para ocultar los divs visibles
function cerrarSombra(sombra) {
    sombra.style.animation = "desaparecer .5s";
    setTimeout(() => sombra.classList.replace("show", "hidden"), 500);
}

// Función para que los styles de los inputs vuelvan a estar vacíos
function vaciarStyles(input) {
    input.style = ''
}

// Evento para agregar nuevo paciente
agregarNuevoPaciente.addEventListener("click", () => {
    // Validación que no permite agregar nuevo paciente si su nombre, propietario o especie están vacíos. El usuario se dará cuenta de la info que falte ya que su input aparecerá con un borde rojo.
    if (nombrePacNuevo.value == '') {
        nombrePacNuevo.style = "border: red 2px solid"
    }
    if (propPacNuevo.value == '') {
        propPacNuevo.style = "border: red 2px solid"
    }
    if (especiePacNuevo.value == '') {
        especiePacNuevo.style = "border: red 2px solid"
    }

    // En caso de existir la info anterior:
    else {
        agregarPaciente(nombrePacNuevo.value, propPacNuevo.value, especiePacNuevo.value, sexoPacNuevo.value, edadPacNuevo.value, razaPacNuevo.value, pesoPacNuevo.value, historiaPacNuevo.value); // Se crea el nuevo paciente y se pushea en listaPacientes
        cerrarSombra(sombraNuevoPaciente); // Se cierra el menú para agregar pacientes
        guardarEnStorage(listaPacientes); // Se guarda en localStorage 
        nuevoPacienteForm.reset(); // Los inputs vuelven a estar vacíos
        vaciarStyles(nombrePacNuevo); // Vaciamos los styles de los inputs (en caso de que hayan estado rojos)
        vaciarStyles(propPacNuevo);
        vaciarStyles(especiePacNuevo);
        actualizarPacientes(listaPacientes); // Mostramos la nueva lista de pacientes en el container
        agregarAddCard() // Agregamos al final la card para sumar pacientes
    }
})

// Evento para cerrar el menú de agregar pacientes
cancelNuevoPaciente.addEventListener("click", () => {
    cerrarSombra(sombraNuevoPaciente);
    nuevoPacienteForm.reset();
    vaciarStyles(nombrePacNuevo)
    vaciarStyles(propPacNuevo);
    vaciarStyles(especiePacNuevo);
})

// Evento para cerrar el div en que vemos al paciente elegido
closePacActual.addEventListener("click", () => {
    cerrarSombra(sombraPacActual);
})

// Evento para que al cargar window se muestren los pacientes del localStorage
window.addEventListener("load", () => {
    listaPacientes = JSON.parse(localStorage.getItem("storagePacientes"));
    if (listaPacientes != null) {
        actualizarPacientes(listaPacientes);
    } else listaPacientes = [];
    agregarAddCard();
})