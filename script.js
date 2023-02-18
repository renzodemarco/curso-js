// Este es un asistente virtual para obtener cantidades de medicación en ml que habrá que administrarle a un paciente según su peso, la dosis buscada y la concentración en la que viene la droga.

// Las primeras cuatro funciones son para obtener datos que nos dará el usuario:

function ingresarDroga() {
    return prompt("Ingrese el nombre del fármaco a utilizar:");
}

function ingresarDosis() {
    return parseFloat(prompt("¿A cuántos mg/kg desea usar el fármaco?"));
}

function ingresarConcentracion() {
    return parseFloat(prompt("¿Cuál es la concentración en mg/ml del fármaco?"));
}

function ingresarPeso() {
    return parseFloat(prompt("¿Cuántos kilogramos pesa el paciente?"));
}

// Esta última función sirve para que el usuario nos diga si quiere continuar calculando dosis o no:

function continuar() {
    let confirmar = prompt("Marque 1 si quiere continuar calculando o marque 2 si ya ha finalizado");
    switch (confirmar) {
        case "1":
            confirmacion = true;
            break;
        case "2":
            confirmacion = false;
            alert("Operación finalizada, muchas gracias por utilizar el asistente virtual");
            break;
        default:
            alert("No ha marcado una opción válida, por favor intente de nuevo");
            continuar();   // el bucle se seguirá ejecutando hasta que la respuesta sea 1 ó 2
    }
}

// Acá ya comienza el bucle donde se utilizará todo lo anterior. Primero declaro la variable confirmacion y digo que es true.

let confirmacion = true;

while (confirmacion == true) {
    let droga = ingresarDroga();
    let dosis = ingresarDosis();
    let concentracion = ingresarConcentracion();
    let peso = ingresarPeso();
    let resultado = peso * dosis / concentracion;  // esta es la cuentita para conocer el resultado buscado
    if (Number.isNaN(dosis) || Number.isNaN(concentracion) || Number.isNaN(peso)) {
        alert("Ha ingresado uno o más datos inválidos, por favor intente de nuevo")
    }    // si dosis, concentracion o peso no es un número, se le mostrará un alert al usuario con el error
    else if (Number.isInteger(resultado)) {
        alert("Deberá utilizar " + resultado + " ml de " + droga);
    }   // si el resultado es un número entero, se mostrará el resultado tal cual en el alert
    else {
        alert("Deberá utilizar " + resultado.toFixed(1) + " ml de " + droga);
    }   // si el resultado tiene decimales, se mostrará el resultado con un único decimal
    continuar();
    // al finalizar le preguntamos al usuario si quiere realizar otro cálculo
}