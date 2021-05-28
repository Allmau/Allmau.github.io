let pais=document.querySelector('#pais');
let ciudad=document.querySelector('#ciudad');
let buscar=document.querySelector('#buscar');

let iconoClima=document.querySelector('#iconoClima');
let paisCiudad=document.querySelector('#paisCiudad');
let temoeratura=document.querySelector('#temperatura');
let descripcion=document.querySelector('#descripcion');

let stermica=document.querySelector('#stermica');
let humedad=document.querySelector('#humedad');
let longitud=document.querySelector('#longitud');
let latitud=document.querySelector('#latitud');



const obtenerNombre = async id => {
    const url = `https://restcountries.eu/rest/v2/alpha/${id}`;
    const respuesta = await fetch(url);
    const nombre = await respuesta.json();
    paisCiudad.innerText=`${paisCiudad.innerText}${nombre.name}`;
}

buscar.addEventListener("click", ()=> {

    let llave='bd4ea33ecf905116d12af172e008dbae';
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${ciudad.value},${pais.value}&APPID=${llave}`;


    fetch(url).then(respuesta => {
        return respuesta.json();
    }).then(datos => {
        console.log(datos);
        let celcius =Math.floor(datos.main.temp - 273.15);
        paisCiudad.innerText= `${datos.name} /`;
        obtenerNombre(datos.sys.country);
        temperatura.innerText=`${celcius}°C`;

        datos.weather.forEach(items => {
            let iconos=`https://openweathermap.org/img/wn/${items.icon}.png`;
            iconoClima.src=iconos;
            descripcion.innerText=items.description;
        })

        let sentermica =Math.floor(datos.main.feels_like - 273.15);
        stermica.innerText=`Sensacion termica ${sentermica}°C`;
        humedad.innerText=`Humedad: ${datos.main.humidity}%`;
        latitud.innerText=`Latitud: ${datos.coord.lat}`;
        longitud.innerText=`Longitud: ${datos.coord.lon}`;
    })
})