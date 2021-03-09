
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

const pedirCarta=()=>{

    if (baraja.length==0) {Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay mas cartas, por favor reinicia el juego',
      })
      document.getElementById("new").disabled = true;
      document.getElementById("pick").disabled = true;
      document.getElementById("stop").disabled = true;
      reload()
    }else{
      return baraja.pop();
      }
}

const valorCarta =(carta) =>{

    const valor=carta.substring(0,carta.length -1);
    return isNaN(valor) ? (valor==='A')? 11:10 : parseInt(valor);
     
}

const iniciarJuego=()=>{

    if (baraja.length<4){Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay cartas suficientes, por favor reinicia el juego',
      })
    }else{
        reload()
        let card;
        let img;
        userScore=0
        comScore=0

        for (let index = 1; index <= 4; index++) {

            card=pedirCarta();
            img= "cartas/"+card+".png"
            if (index<=2){

                document.getElementById('userCard'+index).src=img;
                userScore=userScore+valorCarta(card)

            }else if(index==3){

                document.getElementById('comCard'+(index-2)).src=img;
                comScore=comScore+valorCarta(card)
                bot.innerHTML = 'Computador' +" - " +comScore

            }else{
                botCard=img
                comScore=comScore+valorCarta(card)
            }
        
        }
        cartasRestantes.innerHTML='Cartas Restantes: '+ baraja.length
        user.innerHTML = nombre +" - " +userScore
        userCard=3
        validarScore(userScore)
        document.getElementById("pick").disabled = false;
        document.getElementById("stop").disabled = false;
    }
}


const hit=()=>{

    let card;
    let img;
    card=pedirCarta();
    img= "cartas/"+card+".png"
    document.getElementById('userCard'+userCard).src=img
    cartasRestantes.innerHTML='Cartas Restantes: '+ baraja.length
    userScore=userScore+valorCarta(card)
    user.innerHTML = nombre +" - " +userScore
    userCard++;
    validarScore(userScore);
}

const comHit=()=>{

    let card;
    let img;
    card=pedirCarta();
    img= "cartas/"+card+".png"
    document.getElementById('comCard'+botCard).src=img
    cartasRestantes.innerHTML='Cartas Restantes: '+ baraja.length
    comScore=comScore+valorCarta(card)
    bot.innerHTML = "Computador  - " +comScore
    userCard++;
}

const validarScore=(score)=>{

    if (score>21){
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Has perdido',
      }) 
        document.getElementById("pick").disabled = true;
        document.getElementById("stop").disabled = true;
    }
    
}

const reload=()=>{
    
    for(let index=1; index<=5; index++) {
        if (index<=2){
            document.getElementById("userCard"+index).src="cartas/red_back.png" 
            document.getElementById("comCard"+index).src="cartas/red_back.png" 
        }else{
            document.getElementById("userCard"+index).src=""
            document.getElementById("comCard"+index).src="";
    }
    }
}

const stop=()=>{

    document.getElementById('comCard2').src=botCard
    bot.innerHTML = 'Computador' +" - " +comScore
    botCard=3

    while (comScore<userScore){
        comHit()
        botCard++;
    }

    comScore<=21? comScore==userScore?
    Swal.fire({
        icon: 'info',
        title: 'Ooh...',
        text: 'Has empatado',
      }) :
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Has perdido',
      }) :
      Swal.fire({
        icon: 'success',
        title: 'Hell Yeah...',
        text: 'Has ganado',
      })
      document.getElementById("pick").disabled = true;
      document.getElementById("stop").disabled = true;
      document.getElementById("reset").disabled = false;
}

const reset=()=>{
    location.reload()
}


