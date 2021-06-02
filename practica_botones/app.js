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
