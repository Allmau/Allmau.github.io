let numero=document.querySelector('#numero');
let total=0;

const suma=()=>{
        ++total;
        numero.innerText=`${total}`;
    }

const resta=()=>{
    --total;
    numero.innerText=`${total}`;
}

document.addEventListener('keypress', function(event) {
    restarSumar(event.key);
})

const restarSumar=(tecla)=>{
    switch (tecla) {
        case '-':
            resta();
            break;
        case '+':
            suma();
            break;
        default:
            break;
    }
}