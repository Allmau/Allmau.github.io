let numero=document.querySelector('#numero');
let total=0;

const suma=()=>{
        ++total;
        numero.innerText=`${total}`;
        console.log(total);
    }

const resta=()=>{
    --total;
    numero.innerText=`${total}`;
    console.log(total);
}

document.addEventListener('keypress', function(event) {
    restarSumar(event.key);
})

const restarSumar=(tecla)=>{
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