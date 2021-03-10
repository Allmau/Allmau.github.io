
let nombre
let userScore =0
let comScore=0
let userCard
let botCard
let baraja=[];
let palos=['S','C','D','H'];
let figuras=['J','Q','K','A'];
let user = document.getElementById("player");
let bot = document.getElementById("compu");
let cartasRestantes = document.getElementById("totalCartas");



const load=()=>{

    Swal.fire({
        title: 'Digite el nombre del jugador',
        input: 'text',
        inputAttributes: {
        autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'OK',
        showLoaderOnConfirm: true,
        preConfirm: (p1) => {
            nombre=p1
            user.innerHTML = p1 + " - " +userScore
            crearBaraja();
        },
        allowOutsideClick: () => !Swal.isLoading()
        })
        document.getElementById("new").disabled = false;
}


const crearBaraja=()=>{
    baraja=[];
    for(let i=2; i<=10; i++){
        for(let palocarta of palos){
            baraja.push(i+palocarta);
        }
    }

    for(let figurascarta of figuras){
        for(let palocarta of palos){
            baraja.push(figurascarta+palocarta);
        }
    }

    baraja=_.shuffle(baraja);

}


const buttonEnable=(n,p,s,r)=>{

    n==0?document.getElementById("new").disabled = true:document.getElementById("new").disabled = false;
    p==0?document.getElementById("pick").disabled = true:document.getElementById("pick").disabled = false;
    s==0?document.getElementById("stop").disabled = true:document.getElementById("stop").disabled = false;
    r==0?document.getElementById("reset").disabled = true:document.getElementById("reset").disabled = false;

}


const pedirCarta=()=>{

    return baraja.length==0 ?( mensaje('error', 'Oops...','No hay mas cartas, por favor reinicia el juego'), buttonEnable(0,0,0,1), reload()
    ):(
       baraja.pop()
    )
}


const valorCarta =(carta) =>{

    const valor=carta.substring(0,carta.length -1);
    return isNaN(valor) ? (valor==='A')? 11:10 : parseInt(valor);
     
}


const mensaje=(icono,titulo,texto)=>{
    Swal.fire({
        icon: icono,
        title: titulo,
        text: texto,
      })
}

const iniciarJuego=()=>{

    let card
    let img
    userScore=0
    comScore=0

    if (baraja.length<4){
        mensaje('error','Oops...','No hay cartas suficientes, por favor reinicia el juego')
    }else{
        reload()
        for (let index = 1; index <= 4; index++) {

            card=pedirCarta();
            img= "cartas/"+card+".png"

            index<=2?(
                document.getElementById('userCard'+index).src=img,
                userScore=userScore+valorCarta(card)

            ) : index==3?(
                document.getElementById('comCard'+(index-2)).src=img,
                comScore=comScore+valorCarta(card),
                bot.innerHTML = 'Computador' +" - " +comScore

            ):(
                botCard=img,
                comScore=comScore+valorCarta(card)
            )
        }
        cartasRestantes.innerHTML='Cartas Restantes: '+ baraja.length
        user.innerHTML = nombre +" - " +userScore
        userCard=3
        validarScore(userScore)
    }
}


const hit=(pl)=>{
    
    let card;
    let img;
    card=pedirCarta();
    img= "cartas/"+card+".png"
    pl==1?(
        document.getElementById('userCard'+userCard).src=img,
        cartasRestantes.innerHTML='Cartas Restantes: '+ baraja.length,
        userScore=userScore+valorCarta(card),
        user.innerHTML = nombre +" - " +userScore,
        userCard++,
        validarScore(userScore)
    ):(
        document.getElementById('comCard'+botCard).src=img,
        cartasRestantes.innerHTML='Cartas Restantes: '+ baraja.length,
        comScore=comScore+valorCarta(card),
        bot.innerHTML = "Computador  - " +comScore
    )
}


const validarScore=(score)=>{

    score > 21 ? (mensaje('error','Oops...','Has perdido'), buttonEnable(1,0,0,1)): buttonEnable(1,1,1,1)

}


const reload=()=>{
    
    for(let index=1; index<=5; index++) {
        index<=2?(
            document.getElementById("userCard"+index).src="cartas/red_back.png",
            document.getElementById("comCard"+index).src="cartas/red_back.png"
        ) : (
            document.getElementById("userCard"+index).src="",
            document.getElementById("comCard"+index).src=""
        );
    }
}


const stop=()=>{

    document.getElementById('comCard2').src=botCard
    bot.innerHTML = 'Computador' +" - " +comScore
    botCard=3

    while (comScore<userScore){
        hit(0)
        botCard++;
    }
    comScore<=21? comScore==userScore? mensaje('info','Ooh...', 'Has empatado') : mensaje('error','Oops...','Has perdido') : mensaje('success','Hell Yeah...','Has ganado'),  buttonEnable(1,0,0,1);
}


const reset=()=>{
    location.reload()
}


