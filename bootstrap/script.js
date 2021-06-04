let numero=document.querySelector('#numero');
let total=0;

const f1=()=>{
        numero.innerText=`${total}`;
        total=total+1;
        console.log(total);
    }

const f2=()=>{
    numero.innerText=`${total}`;
    total=total-1;
    console.log(total);
}

document.addEventListener('keypress', function(event) {
    reproducirSonido(event.key);
})

const reproducirSonido=(tecla)=>{
    switch (tecla) {
        case '-':
            f2();
            break;
        case '+':
            f1();
            break;
        default:
            break;
    }
}