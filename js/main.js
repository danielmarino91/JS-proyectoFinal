let saldoActual = parseInt(localStorage.getItem("saldoGuardado"));

if (isNaN(saldoActual)) 
    {
        saldoActual = parseInt(0);
        $("#saldoActual").html(saldoActual);
        console.log(`Saldo inicial: ${saldoActual}`);
    }
    else
    {
        $("#saldoActual").html(saldoActual);
        console.log(`Saldo inicial: ${saldoActual}`);
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
const listaDeJuegos = [juego0, juego1, juego2, juego3, juego4, juego5, juego6, juego7, juego8, juego9, juego10, juego11, juego12, juego13, juego14];
let juegosComprados = [];

const actLista = JSON.parse(localStorage.getItem("listaEnJSON"));
juegosComprados = actLista;
$("#misJuegos").html(juegosComprados.join("</br>"));
$("#cantidadJuegos").html(`(${juegosComprados.length})`);

//GENERAR JUEGOS EN HTML
for (let i = 0; i < 15; i++)
{
    $(`#productGames`).append(`<div class="productGames__game">
    <img src="images/producto${i}.png" alt="juego${i}">
    <div class="productGames__cart">
        <h3 id="producto${i}"></h3>
        <button onclick="comprarJuego(juego${i})"><img src="images/carrito.png" alt="carrito"></button> 
    </div>
</div>`);
}

//GENERAR NOMBRES Y PRECIOS EN HTML
for (let i = 0; i < 15; i++)
{
    $(`#producto${i}`).html(listaDeJuegos[i].nombre + "</br><span>" + listaDeJuegos[i].precio + "</span>");
}

//EVENTOS
$("#agregarSaldo").on("click", agregarSaldo);
$("#resetearSaldo").on("click", resetearSaldo);
$("#vaciarJuegosComprados").on("click", vaciarJuegosComprados);

//METODOS
function agregarSaldo() 
{
    let saldoAgregado = parseInt(prompt("Ingrese el saldo"));
    
    /*
    $("body").prepend(`
    <div class="modalBackground"></div>
    <div class="modalAlert">
            <h2>Ingrese el saldo que quiere agregar</h2>
            <input type="text" id="saldoParaAgregar">
            <p>El valor ingresado no es un numero</p>
            <div class="modalAlert__buttons">
                <input type="submit" id="btnAgregar" value="Agregar">Agregar</input>
                <input type="" id="btnSubmit" value="Cancelar">Cancelar</input>
            </div>
    </div>
    `)
    */

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
        alert("No se agrego el saldo");
        console.log("No se agrego el saldo");
    }
    else 
    {
        saldoActual = saldoActual + saldoAgregado;
        localStorage.setItem("saldoGuardado", saldoActual);

        alert(`Su saldo actual es de: ${saldoActual}`);
        $("#saldoActual").html(saldoActual);
        console.log(`Recarga de saldo: ${saldoAgregado}`);
        console.log(`Saldo actual: ${saldoActual}`);
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
        alert(`Saldo insuficiente, necesita ${restoSaldo} mas para realizar la compra de ${juegoElegido.nombre}`);
        console.log(`Saldo insuficiente, necesita ${restoSaldo} mas para realizar la compra de ${juegoElegido.nombre}`);
    } 
    else if (juegoRepetido == true) 
    {
        alert(`Ya tienes ${juegoElegido.nombre} en tu lista de juegos`);
        console.log(`Ya tienes ${juegoElegido.nombre} en tu lista de juegos`);        
    }
    else 
    {
        saldoActual = saldoEnProceso;
        localStorage.setItem("saldoGuardado", saldoActual);
        juegosComprados.push(juegoElegido.nombre);
        
        alert(`Felicidades, acabas de comprar: ${juegoElegido.nombre}`);
        $("#saldoActual").html(saldoActual); 
        $("#misJuegos").html(juegosComprados.join("</br>"));
        $("#cantidadJuegos").html(`(${juegosComprados.length})`);
        console.log(`El usuario acaba de comprar el juego ${juegoElegido.nombre} y su saldo ahora es de ${saldoActual}`);
        console.log(`Juegos comprados: ${juegosComprados.length}`);
    }

    const listaEnJSON = JSON.stringify(juegosComprados);
    localStorage.setItem("listaEnJSON", listaEnJSON);
}

function resetearSaldo()
{
    saldoActual = parseInt(0);
    localStorage.setItem("saldoGuardado", saldoActual);
    
    $("#saldoActual").html(saldoActual);
    console.log("Se reseteo el saldo a 0");
}

function vaciarJuegosComprados()
{
    juegosComprados.length = 0;
    const vaciarListaEnJSON = JSON.stringify(juegosComprados);
    localStorage.setItem("listaEnJSON", vaciarListaEnJSON);

    $("#misJuegos").html(juegosComprados.join());
    $("#cantidadJuegos").html(`(${juegosComprados.length})`);
    console.log(`Se vacio la lista de juegos comprados, ahora tienes ${juegosComprados.length} juegos`);
}

function comprobarJuego(juegoVariable)
{
    localStorage.getItem("listaDeJuegos");
    let identificarJuego = juegoVariable.nombre;
    let buscarJuegoEnArray = juegosComprados.find(x => x === juegoVariable.nombre);

    if (identificarJuego == buscarJuegoEnArray) 
    {
        return juegoRepetido = true;    
    }
    else
    {
        return juegoRepetido = false;
    }
}