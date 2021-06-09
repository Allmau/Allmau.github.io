const inputPelicula = document.querySelector('#pelicula');
const btnBuscar = document.querySelector('#buscar');
const apiKey="13eb27b39bf03ff6b3df991a9f45ca19";
const URL=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputPelicula}`;
const contenedor = document.querySelector('#contenedor2');

btnBuscar.addEventListener("click", function(pelicula){
    event.preventDefault();
    let peli=inputPelicula.value;
    if (peli==""){
        Swal.fire('Por favor ingresa un criterio de busqueda')
    }else{
        cargarPelis(peli);
    }
})


const cargarPelis=(peli)=>{
    limpiarPantalla();
    const URL=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${peli}`;
    fetch(URL).then(respuesta => respuesta.json()).then(datos =>{
        console.log(datos);


        for(let i = 0; i<datos.results.length ; i++){

            let datosPeli=datos.results[i];
            const peliDiv = document.createElement('div');
            peliDiv.classList.add('peliList');
            let imgPoster=`http://image.tmdb.org/t/p/original${datosPeli.poster_path}`;
            let totalDescripcion=datosPeli.overview.length;
            let descripcion=datosPeli.overview.slice(0,120);
        
            if (datosPeli.poster_path == null) {
               imgPoster="https://lh3.googleusercontent.com/proxy/NnQap2CuCXykG9K5YSfgFrR2V_whcmWhC7dA60L1VWzYqP76Xd0yD9g1uBheSmE2HySWYqQEjQcF7jnI6Tbp33OL7Y_Uw0Hs6C4lkx0";
            }

        
            if (totalDescripcion > 120) {
                descripcion=`${descripcion}<span id="dots${i}">...</span><span class="moreHide" id="more${i}">${datosPeli.overview.slice(120)}</span></p>
                <button onclick="myFunction(${i})" class="btn btn-info my-2 my-sm-0" id="myBtn${i}">Read more</button>
                `;
            }

            if (totalDescripcion == 0) {
                descripcion="No hay descripcion disponible para este titulo";
            }

            const peliHTML = `
            <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img src="${imgPoster}" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${datosPeli.original_title}</h5>
                  <p class="card-text">${descripcion}</p>
                  <p class="card-text"><small class="text-muted">Puntuacion: ${datosPeli.vote_average}</small></p>
                </div>
              </div>
            </div>
          </div>
             `;

            peliDiv.innerHTML = peliHTML;
            contenedor.appendChild(peliDiv);
        }
    })
}

function myFunction(i) {
    var dots = document.getElementById(`dots${i}`);
    var moreText = document.getElementById(`more${i}`);
    var btnText = document.getElementById(`myBtn${i}`);
    
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }

const limpiarPantalla =()=>{contenedor.innerHTML='';}