let saldoActual = parseInt(localStorage.getItem("saldoGuardado"));

comprobarSaldo()

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

const listaDeJuegos = [juego0, juego1, juego2, juego3, juego4, juego5, juego6, juego7, juego8, juego9, juego10, juego11, juego12, juego13, juego14];
let juegosComprados = [];
let juegoRepetido = false;

comprobarJuegosComprados()

//GENERAR JUEGOS EN HTML
for (let i = 0; i < 15; i++)
{
    $(`#productGames`).append(`<div class="productGames__game">
    <img src="images/producto${i}.png" alt="${listaDeJuegos[i].nombre}">
    <div class="productGames__cart">
        <h3 id="producto${i}"></h3>
        <button id="comprarJuego${i}"><img src="images/carrito.png" alt="carrito"></button> 
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
for (let i = 0; i < 15; i++)
{
    $(`#comprarJuego${i}`).on("click", function(){comprarJuego(listaDeJuegos[i])});
}

//METODOS
function agregarSaldo() 
{
    let saldoAgregado = parseInt(prompt("Ingrese el saldo"));
    
    /*
    $("body").prepend(`
    <div class="modalBackground"></div>
    <div class="modalAlert">
            <h2>Ingrese el saldo a agregar</h2>
            <input type="text" id="saldoParaAgregar">
            <p>El valor ingresado no es un numero</p>
            <div class="modalAlert__buttons">
                <button type="submit" id="btnAgregar" value="Agregar">Agregar</button>
                <button type="" id="btnSubmit" value="Cancelar">Cancelar</button>
            </div>
    </div>
    `)
    */

    if (isNaN(saldoAgregado)) 
    {
        generarAlerta("El valor ingresado no es un número");
        console.log("El valor ingresado no es un número");
    }
    else if (saldoAgregado < 0) 
    {
        generarAlerta("No se aceptan valores negativos");
        console.log("No se aceptan valores negativos");
    }
    else if (saldoAgregado == 0) 
    {
        generarAlerta("No se agrego saldo");
        console.log("No se agrego saldo");
    }
    else 
    {
        saldoActual = saldoActual + saldoAgregado;
        localStorage.setItem("saldoGuardado", saldoActual);

        generarAlerta(`Su saldo actual es de: ${saldoActual}`);
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
        generarAlerta(`Saldo insuficiente, necesita ${restoSaldo} mas para realizar la compra de ${juegoElegido.nombre}`);
        console.log(`Necesita ${restoSaldo} para realizar la compra de ${juegoElegido.nombre}`);
    } 
    else if (juegoRepetido == true) 
    {
        generarAlerta(`Ya adquiriste ${juegoElegido.nombre}`);
        console.log(`Ya adquiriste ${juegoElegido.nombre}`);        
    }
    else 
    {
        saldoActual = saldoEnProceso;
        localStorage.setItem("saldoGuardado", saldoActual);
        juegosComprados.push(juegoElegido.nombre);
        
        generarAlerta(`Felicidades, acabas de comprar: ${juegoElegido.nombre}`);
        $("#saldoActual").html(saldoActual); 
        $("#listaJuegosComprados").html(juegosComprados.join("</br>"));
        $("#cantidadJuegos").html(`(${juegosComprados.length})`);
        console.log(`Juego comprado: ${juegoElegido.nombre}, Nuevo saldo: ${saldoActual}`);
        console.log(`Juegos comprados: ${juegosComprados.length}`);
        let juegosCompradosJSON = JSON.stringify(juegosComprados);
        localStorage.setItem("juegosAdquiridos", juegosCompradosJSON);
    }
}

function resetearSaldo()
{
    saldoActual = parseInt(0);
    generarAlerta("Se reseteo el saldo");
    localStorage.setItem("saldoGuardado", saldoActual);
    $("#saldoActual").html(saldoActual);
    console.log(`Se reseteo el saldo, nuevo saldo: ${saldoActual}`);
}

function vaciarJuegosComprados()
{
    juegosComprados.length = 0;
    $("#listaJuegosComprados").html(juegosComprados.join());
    $("#cantidadJuegos").html(`(${juegosComprados.length})`);
    generarAlerta("Se vacio la lista de juegos");
    console.log(`Se vacio la lista de juegos, nueva cantidad: ${juegosComprados.length}`);
    let listaVaciaJSON = JSON.stringify(juegosComprados);
    localStorage.setItem("juegosAdquiridos", listaVaciaJSON);
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

function comprobarSaldo()
{
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
}

function comprobarJuegosComprados()
{
    let arrayLocal = JSON.parse(localStorage.getItem(`juegosAdquiridos`));

    if (arrayLocal == null)
    {
        console.log(`Juegos comprados: ${juegosComprados.length}`);
    }
    else
    {
        for (let valor of arrayLocal)
        {
            juegosComprados.push(valor);
        }
        console.log(`Juegos comprados: ${juegosComprados.length}`);
    }
    $("#listaJuegosComprados").html(juegosComprados.join("</br>"));
    $("#cantidadJuegos").html(`(${juegosComprados.length})`);
}

function generarAlerta(variableMessage)
{
    $("#notifications").append(`
    <div class="generateNotification" style="display: none">${variableMessage}</div>
    `)
    $(".generateNotification").slideDown(350).delay(5000).slideUp(350);
    setTimeout(function(){
        $(".generateNotification:first-child").remove()
    }, 5700)
    
}
