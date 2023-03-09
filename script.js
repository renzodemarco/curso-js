// Este es un asistente virtual para registrar pacientes en una veterinaria. Por el momento sólo se pueden hacer operaciones para agregar ya que para modificar/eliminar se hace muy tedioso con alerts/prompts así que dejo esto último para cuando la entrega incluya DOM.

//creo la clase paciente
class Paciente {
    constructor(nombre, especie, sexo, edad, raza, peso, propietario, historia) {
        this.nombre = nombre;
        this.especie = especie;
        this.sexo = sexo;
        this.edad = edad;
        this.raza = raza;
        this.peso = peso;
        this.propietario = propietario;
        this.historia = historia;
        this.medicacion = [];
    }

    //le creo un método para agregarle medicación
    agregarMedicacion() {
        let nuevaDroga = prompt("¿Qué droga desea agregar?");
        let nuevaDosis = parseFloat(prompt("¿A cuántos mg/kg desea usar la droga?"));
        let nuevaConcentracion = parseFloat(prompt("¿Cuál es la concentración en mg/ml del fármaco?"));
        let calculo = this.peso * nuevaDosis / nuevaConcentracion;
        if (Number.isNaN(nuevaDosis) || Number.isNaN(nuevaConcentracion)) {
            alert("Ha ingresado uno o más datos inválidos, por favor intente de nuevo");  //validación para que los datos ingresados siempre sean números
            this.agregarMedicacion();
        } else if (Number.isInteger(calculo)) {
            var nuevoVolumen = calculo;
        } else {
            var nuevoVolumen = calculo.toFixed(1);  //si la cuenta da un número entero se muestra tal cual, de lo contrario se muestra con un único decimal
        }

        const nuevaMedicacion = new Medicacion(nuevaDroga, nuevoVolumen);  //el resultado pertenecerá a la clase medicacion

        this.medicacion.push(nuevaMedicacion);  //pusheo la medicacion en paciente.medicacion

        alert("Se ha agregado " + nuevaDroga + " a " + this.nombre);
    }
}

//creo la clase medicacion
class Medicacion {
    constructor(droga, volumen) {
        this.droga = droga;
        this.volumen = volumen;
    }
}

//funcion para que la especie solo pueda ser canino o felino
function ingresarEspecie() {
    especie = prompt("Ingrese la especie del paciente: Escriba C si es canino o F si es felino");
    switch (especie.toLowerCase()) {
        case "c":
            return "Canino";
        case "f":
            return "Felino";
        default:
            alert("No ha ingresado una opción válida, por favor intente de nuevo");
            return ingresarEspecie();
    }
}

//funcion para que el sexo solo pueda ser hembra o macho
function ingresarSexo() {
    sexo = prompt("Ingrese el sexo del paciente: Escriba M si es macho o H si es hembra");
    switch (sexo.toLowerCase()) {
        case "m":
            return "Macho";
        case "h":
            return "Hembra";
        default:
            alert("No ha ingresado una opción válida, por favor intente de nuevo");
            return ingresarSexo();
    }
}

//funcion para que el peso solo pueda ser un numero
function ingresarPeso() {
    peso = parseInt(prompt("Ingrese el peso en kilogramos del paciente"));
    if (Number.isNaN(peso)) {
        alert("Por favor ingrese un número");
        return ingresarPeso();
    } else return peso;
}

//funcion para agregar pacientes
function agregarPaciente() {
    let nuevoNombre = prompt("Ingrese el nombre del nuevo paciente");
    let nuevaEspecie = ingresarEspecie();
    let nuevoSexo = ingresarSexo();
    let nuevaEdad = prompt("Ingrese la edad del paciente aclarando si es en años y/o meses");
    let nuevaRaza = prompt("Ingrese la raza del paciente");
    let nuevoPeso = ingresarPeso();
    let nuevoPropietario = prompt("Ingrese apellido y nombre del propietario");
    let nuevaHistoria = prompt("Ingrese la historia clínica del animal");

    const nuevoPaciente = new Paciente(nuevoNombre, nuevaEspecie, nuevoSexo, nuevaEdad, nuevaRaza, nuevoPeso, nuevoPropietario, nuevaHistoria);  //declaro que este nuevo paciente pertenece a la clase paciente

    pacientes.push(nuevoPaciente);  //lo pusheo en el array de pacientes
    alert("Paciente agregado exitosamente");
}

//el array donde estarán todos los pacientes y ya hay algunos hardcodeados
const pacientes = [
    new Paciente("Hulk", "Canino", "Macho", "6 años", "Dogo de Burdeos", "40", "Messi Lionel", "Se comió una medalla de oro hace 2 días y está con vómitos y decaimiento. Está en espera de análisis prequirúrgicos para entrar a cirugía."),
    new Paciente("Trostki", "Felino", "Macho", "1 año y 6 meses", "Común Europeo", "2.5", "Fernández Mabel", "No puede orinar desde ayer, los últimos días ha visto sangre en su litera. Presenta decaimiento y anorexia."),
    new Paciente("Mora", "Canino", "Hembra", "4 meses", "Caniche", "2", "Maldonado Alicia", "Dos días de decaimiento, anorexia, diarrea y vómitos. Plan de vacunación incompleto. Ingresa hipoglucémica y deshidratada.")
]

//tambien hardcodeo medicaciones en algunos pacientes
pacientes[1].medicacion.push({droga:"Tramadol", volumen: 1},{droga:"Meloxicam", volumen: 0.1});
pacientes[2].medicacion.push({droga:"Ranitidina", volumen: 0.2}, {droga:"Metoclopramida", volumen: 0.2}, {droga:"Tramadol", volumen: 0.1}, {droga:"Enrofloxacina", volumen: 0.2}, {droga:"Clindamicina", volumen: 0.1})

//el menú se ejecuta mientras confirmacion sea true
let confirmacion = true;

//acá está el menu principal con todas las opciones (sí, es un lio pero espero solucionarlo cuando use DOM)
while (confirmacion == true) {
    let opciones = prompt("Elija una opción marcando un número: \n1: Si quiere ver la información de los pacientes actuales. \n2: Si quiere agregar un nuevo paciente. \n3: Si quiere agregar medicación a algún paciente. \nX: Si desea finalizar.");
    switch (opciones.toUpperCase()) {
        case "1":  //1) VER LA INFO DE LOS PACIENTES
            for (let paciente of pacientes) {
                let medicacionActual = []; //primero creo un array para ir poniendo todas las medicaciones de cada paciente
                for (i = 0; i < paciente.medicacion.length; i++) {
                    medicacionActual.push(" \nDroga: " + paciente.medicacion[i].droga + ", Volumen: " + paciente.medicacion[i].volumen + "ml"); //agrego cada medicacion aclarando droga y volumen de cada una de modo que quede ordenado
                }
                if (paciente.medicacion.length == 0) medicacionActual = "Sin medicaciones";
                alert("NOMBRE: " + paciente.nombre + "\nESPECIE: " + paciente.especie + "\nSEXO: " + paciente.sexo + "\nEDAD: " + paciente.edad + "\nRAZA: " + paciente.raza + "\nPESO: " + paciente.peso + "kg \nPROPIETARIO: " + paciente.propietario + "\nHISTORIA: " + paciente.historia + "\nMEDICACION: " + medicacionActual); //acá ya pongo todo el texto con la info del paciente utilizando el array creado anteriormente
            }
            break;
        case "2": //2) AGREGAR UN PACIENTE NUEVO
            agregarPaciente();
            break;
        case "3": //3) AGREGAR MEDICACION A UN PACIENTE
            let listaPacientes = [];
            let id = 1;
            for (let paciente of pacientes) {
                listaPacientes.push("\n" + id + ": " + paciente.nombre);
                id++; //creo una lista numerada con los pacientes para que el usuario elija a quien agregar medicacion
            };
            let pacienteElegido = prompt("¿A qué paciente desea agregarle medicación? \n" + listaPacientes);
            alert("Agregandole medicacion a " + pacientes[pacienteElegido - 1].nombre); 
            pacientes[pacienteElegido - 1].agregarMedicacion(); //una vez que se elige, ejecuto la funcion sobre el id del paciente elegido menos 1 para que coincida con el índice que le da el array
            break;
        case "X": //X) FINALIZAR
            confirmacion = false;  //confirmacion se vuelve false, por lo que ya no se ejecuta el menu
            break;
        default:
            alert("Por favor elija una opción valida");
            break;
    }
}
