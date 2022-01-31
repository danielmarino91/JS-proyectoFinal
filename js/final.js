let saldoActual = parseInt(localStorage.getItem("saldoGuardado"));

if (isNaN(saldoActual)) 
    {
        saldoActual = parseInt(0);
        document.getElementById("saldoActual").innerHTML = saldoActual;
        console.log("Saldo inicial: " + saldoActual);
    }
    else
    {
        document.getElementById("saldoActual").innerHTML = saldoActual;
        console.log("Saldo inicial: " + saldoActual);
    }

let juegoRepetido = false;

class juego 
{
    constructor(nombreJuego, precioJuego, idJuego) 
    {
        this.nombre = nombreJuego;
        this.precio = precioJuego;
        this.id = idJuego;
    }
}

//JUEGOS
const juego0 = new juego("Crash Bandicoot 4: It's About Time", 9000, "juego0");
const juego1 = new juego("Cyberpunk 2077", 6000, "juego1");
const juego2 = new juego("DeathLoop", 10000, "juego2");
const juego3 = new juego("Doom Eternal", 3800, "juego3");
const juego4 = new juego("GTA The Trilogy", 12000, "juego4");
const juego5 = new juego("Guilty Gear Strive", 10000, "juego5");
const juego6 = new juego("It Takes Two", 8100, "juego6");
const juego7 = new juego("Metroid Dread", 11000, "juego7");
const juego8 = new juego("Nioh 2", 9000, "juego8");
const juego9 = new juego("Psychonauts 2", 9000, "juego9");
const juego10 = new juego("Ratchet and Clank Rift Apart", 6750, "juego10");
const juego11 = new juego("Resident Evil Village", 10000, "juego11");
const juego12 = new juego("Returnal", 10400, "juego12");
const juego13 = new juego("Spider-Man: Miles Morales", 9000, "juego13");
const juego14 = new juego("Yakuza Like a Dragon", 4800, "juego14");

//ARRAY DE OBJETOS
let listaDeJuegos = [];

//PRINTEAR NOMBRE Y PRECIO EN EL HTML
document.getElementById("producto0").innerHTML = juego0.nombre + "</br><span>" + juego0.precio + "</span>";
document.getElementById("producto1").innerHTML = juego1.nombre + "</br><span>" + juego1.precio + "</span>";
document.getElementById("producto2").innerHTML = juego2.nombre + "</br><span>" + juego2.precio + "</span>";
document.getElementById("producto3").innerHTML = juego3.nombre + "</br><span>" + juego3.precio + "</span>";
document.getElementById("producto4").innerHTML = juego4.nombre + "</br><span>" + juego4.precio + "</span>";
document.getElementById("producto5").innerHTML = juego5.nombre + "</br><span>" + juego5.precio + "</span>";
document.getElementById("producto6").innerHTML = juego6.nombre + "</br><span>" + juego6.precio + "</span>";
document.getElementById("producto7").innerHTML = juego7.nombre + "</br><span>" + juego7.precio + "</span>";
document.getElementById("producto8").innerHTML = juego8.nombre + "</br><span>" + juego8.precio + "</span>";
document.getElementById("producto9").innerHTML = juego9.nombre + "</br><span>" + juego9.precio + "</span>";
document.getElementById("producto10").innerHTML = juego10.nombre + "</br><span>" + juego10.precio + "</span>";
document.getElementById("producto11").innerHTML = juego11.nombre + "</br><span>" + juego11.precio + "</span>";
document.getElementById("producto12").innerHTML = juego12.nombre + "</br><span>" + juego12.precio + "</span>";
document.getElementById("producto13").innerHTML = juego13.nombre + "</br><span>" + juego13.precio + "</span>";
document.getElementById("producto14").innerHTML = juego14.nombre + "</br><span>" + juego14.precio + "</span>";

//METODOS
function agregarDinero() 
{
    let saldoAgregado = parseInt(prompt("Ingrese el saldo"));

    if (isNaN(saldoAgregado)) 
    {
        alert("El valor ingresado no es un número");
        console.log("El valor ingresado no es un número");
    }
    else if (saldoAgregado < 0) 
    {
        alert("No se aceptan valores negativos");
        console.log("No se aceptan valores negativos");
    }
    else if (saldoAgregado == 0) 
    {
        alert("No se agrego dinero a su saldo");
        console.log("No se agrego dinero a su saldo");
    }
    else 
    {
        saldoActual = saldoActual + saldoAgregado;

        alert("Su saldo actual es de: " + saldoActual)
        localStorage.setItem("saldoGuardado", saldoActual);
        document.getElementById("saldoActual").innerHTML = saldoActual;
        console.log("Recarga de saldo: " + saldoAgregado)
        console.log("Saldo actual: " + saldoActual)
    }
}

function comprarJuego(juegoElegido) 
{
    let valorJuego = juegoElegido.precio;
    let saldoEnProceso = saldoActual - valorJuego;
    let restoSaldo = valorJuego - saldoActual;
    
    comprobarJuego(juegoElegido);
    
    if (saldoEnProceso < 0) 
    {
        alert("Saldo insuficiente, necesita " + restoSaldo + " mas para realizar la compra de " + juegoElegido.nombre);
        console.log("Saldo insuficiente, necesita " + restoSaldo + " mas para realizar la compra de " + juegoElegido.nombre);
    } 
    else if (juegoRepetido == true) 
    {
        alert("Ya tienes " + juegoElegido.nombre + " en tu lista de juegos");
        console.log("Ya tienes " + juegoElegido.nombre + " en tu lista de juegos");        
    }
    else 
    {
        saldoActual = saldoEnProceso;
        listaDeJuegos.push(juegoElegido.nombre);
        
        alert("Felicidades, acabas de comprar: " + juegoElegido.nombre);
        localStorage.setItem("saldoGuardado", saldoActual);
        document.getElementById("saldoActual").innerHTML = saldoActual;
        document.getElementById("misJuegos").innerHTML = "• " + listaDeJuegos.join("</br> • ");
        document.getElementById("cantidadJuegos").innerHTML = "(" + listaDeJuegos.length + ")";
        console.log("El usuario acaba de comprar el juego " + juegoElegido.nombre + " y su saldo ahora es de " + saldoActual);
        console.log("Juegos comprados: " + listaDeJuegos.length);
    }
}

function resetearSaldo()
{
    saldoActual = parseInt(0);

    localStorage.setItem("saldoGuardado", saldoActual);
    document.getElementById("saldoActual").innerHTML = saldoActual;
    console.log("Se reseteo el saldo a 0");
}

function vaciarCarrito()
{
    listaDeJuegos.length = 0;
    
    document.getElementById("misJuegos").innerHTML = listaDeJuegos.join();
    document.getElementById("cantidadJuegos").innerHTML = " ";
    console.log("Se vacio la lista, ahora tienes " + listaDeJuegos.length + " juegos");
}

function comprobarJuego(juegoVariable)
{
    let identificarJuego = juegoVariable.nombre;
    let buscarJuegoEnArray = listaDeJuegos.find(x => x === juegoVariable.nombre);

    if (identificarJuego == buscarJuegoEnArray) 
    {
        return juegoRepetido = true;    
    }
    else
    {
        return juegoRepetido = false;
    }
}