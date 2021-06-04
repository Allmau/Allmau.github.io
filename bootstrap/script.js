let numero=document.querySelector('#numero');
let total=0;

const f1=()=>{
        ++total;
        numero.innerText=`${total}`;
        console.log(total);
    }

const f2=()=>{
    --total;
    numero.innerText=`${total}`;
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