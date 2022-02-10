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

//GENERAR JUEGOS, NOMBRES Y PRECIOS EN HTML
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

for (let i = 0; i < 15; i++)
{
    $(`#producto${i}`).html(listaDeJuegos[i].nombre + "</br><span>" + listaDeJuegos[i].precio + "</span>");
}

//EVENTOS
$("#agregarSaldo").on("click", agregarSaldo);
$("#resetearSaldo").on("click", resetearSaldo);
$("#vaciarJuegosComprados").on("click", vaciarJuegosComprados);
$("#pokeButton").on("click", comprarPokebola);

for (let i = 0; i < 15; i++)
{
    $(`#comprarJuego${i}`).on("click", function(){
        comprarJuego(listaDeJuegos[i])
    });
}

//METODOS
function agregarSaldo() 
{
    $("#addBalance").prepend(`
    <div class="modalBackground"></div>
    <div id="modalAlert">
        <h2>Ingrese el saldo a agregar</h2>
        <input type="text" maxlength="7" name="nuevoSaldo" id="nuevoSaldo"></input>
        <p id="errorMessage"></p>
        <div class="modalAlert__buttons">
            <button type="submit" id="btnSubmit" value="Agregar">Agregar</button>
            <button type="button" id="btnCancelar" value="Cancelar">Cancelar</button>
        </div>
    </div>
    `)

    $("#nuevoSaldo").focus();    
    $("#btnSubmit").click(extraerValor);
    $("#btnCancelar").click(quitarModal);
    $("#nuevoSaldo").keyup(function(e)
    {
        if(e.keyCode == 13)
        {
            extraerValor();
        }
        else if (e.keyCode == 27)
        {
            quitarModal();
        }
    });
}

function extraerValor()
{
    let saldoAgregado = parseInt($("#nuevoSaldo").val());

    if (isNaN(saldoAgregado)) 
    {
        $("#errorMessage").html("El valor ingresado no es un número");
        generarAlerta("El valor ingresado no es un número");
        console.log("El valor ingresado no es un número");
        $("#nuevoSaldo").val('');
        $("#nuevoSaldo").focus();
    }
    else if (saldoAgregado < 0) 
    {
        $("#errorMessage").html("No se aceptan valores negativos");
        generarAlerta("No se aceptan valores negativos");
        console.log("No se aceptan valores negativos");
        $("#nuevoSaldo").val('');
        $("#nuevoSaldo").focus();
    }
    else if (saldoAgregado == 0) 
    {
        $("#errorMessage").html("Debe ingresar un número mayor a 0");
        generarAlerta("Debe ingresar un número mayor a 0");
        console.log("Debe ingresar un número mayor a 0");
        $("#nuevoSaldo").val('');
        $("#nuevoSaldo").focus();
    }    
    else if (saldoAgregado > 9999999) 
    {
        $("#errorMessage").html("No puede ingresar un número tan alto");
        generarAlerta("No puede ingresar un número tan alto");
        console.log("No puede ingresar un número tan alto");
        $("#nuevoSaldo").val('');
        $("#nuevoSaldo").focus();
    }
    else if (saldoActual + saldoAgregado > 9999999) 
    {
        $("#errorMessage").html("No se puede exceder el limite de 9999999");
        generarAlerta("No se puede exceder el limite de 9999999");
        console.log("No se puede exceder el limite de 9999999");
        $("#nuevoSaldo").val('');
        $("#nuevoSaldo").focus();
    }
    else 
    {
        saldoActual = saldoActual + saldoAgregado;
        localStorage.setItem("saldoGuardado", saldoActual);

        generarAlerta(`Su nuevo saldo es de <span>${saldoActual}<span>`);
        $("#saldoActual").html(saldoActual);
        console.log(`Recarga de saldo: ${saldoAgregado}`);
        console.log(`Saldo actual: ${saldoActual}`);
        quitarModal();
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
        generarAlerta(`Saldo insuficiente, necesita <span>${restoSaldo}</span> mas para realizar la compra de <span>${juegoElegido.nombre}</span>`);
        console.log(`Necesita ${restoSaldo} para realizar la compra de ${juegoElegido.nombre}`);
    } 
    else if (juegoRepetido == true) 
    {
        generarAlerta(`Ya adquiriste <span>${juegoElegido.nombre}</span>`);
        console.log(`Ya adquiriste ${juegoElegido.nombre}`);        
    }
    else 
    {
        saldoActual = saldoEnProceso;
        localStorage.setItem("saldoGuardado", saldoActual);
        juegosComprados.push(juegoElegido.nombre);
        
        generarAlerta(`Felicidades! Acabas de comprar <span>${juegoElegido.nombre}</span>`);
        $("#saldoActual").html(saldoActual); 
        $("#listaJuegosComprados").html(juegosComprados.join("</br>"));
        $("#cantidadJuegos").html(`(${juegosComprados.length})`);
        console.log(`Juego comprado: ${juegoElegido.nombre}, Nuevo saldo: ${saldoActual}`);
        console.log(`Juegos comprados: ${juegosComprados.length}`);
        let juegosCompradosJSON = JSON.stringify(juegosComprados);
        localStorage.setItem("juegosAdquiridos", juegosCompradosJSON);
    }
}

function comprarPokebola()
{
    if (saldoActual < 1000)
    {
        generarAlerta("Su saldo es insuficiente para comprar una <span>Pokebola</span>");
        console.log("Su saldo es insuficiente para comprar una Pokebola");
    }
    else
    {
    saldoActual = parseInt(saldoActual - 1000);
    localStorage.setItem("saldoGuardado", saldoActual);
    generarAlerta(`Adquiriste una <span>Pokebola<span>`);
    console.log(`Adquiriste una Pokebola`);
    $("#saldoActual").html(saldoActual);

    $("#buyPokeball").append(`
    <div class="pokemodalBackground"></div>
    <div id="pokemodalAlert">
        <img src="images/pokebola.png" alt="Pokebola" id="pokebola">
        <div class="pokemodalAlert__buttons">
            <button type="submit" id="pokebtnSubmit" value="Agregar">Abrir Pokebola</button>
        </div>
    </div>
    `);

    $("#pokebtnSubmit").click(abrirPokebola);
    }
}

function abrirPokebola()
{
    $("#pokebola").remove();
    console.log("Se abrio la Pokebola...");

    $("#pokemodalAlert").prepend(`
        <h2 id="temporalMessage">Abriendo Pokebola...</h2> 
        `)

    function generarNumeroRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    let numeroPokemon = parseInt(generarNumeroRandom(1,898));
    
    $.get(`https://pokeapi.co/api/v2/pokemon/${numeroPokemon}`, (res) =>
    {
        let nombreMayus = res.name.toUpperCase();

        $("#temporalMessage").remove();

        $("#pokemodalAlert").prepend(`
        <h2>Felicidades! Obtuviste un <span>${nombreMayus}</span></h2>
        <img src="${res.sprites.front_default}" alt="Pokemon"> 
        `)
        generarAlerta(`Felicidades! Obtuviste un <span>${nombreMayus}</span>`);
        console.log(`Felicidades! Obtuviste un ${nombreMayus}`);
    });

    $(".pokemodalAlert__buttons").prepend(`
    <button type="button" id="pokebtnAceptar" value="Aceptar">Aceptar</button>
    `)
    
    $("#pokebtnSubmit").remove()
    $("#pokebtnCancelar").remove();
    $("#pokebtnAceptar").click(quitarModal);
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

function quitarModal()
{
    $(".modalBackground").remove()
    $("#modalAlert").remove()
    $(".pokemodalBackground").remove()
    $("#pokemodalAlert").remove()
}