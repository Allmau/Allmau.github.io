const inputPelicula = document.querySelector('#pelicula');
const btnBuscar = document.querySelector('#buscar');
const btnNext = document.querySelector('#next');
const btnPrevious = document.querySelector('#previous');
const apiKey="13eb27b39bf03ff6b3df991a9f45ca19";
const URL=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${inputPelicula}`;
const contenedor = document.querySelector('#contenedor2');
const contenedor3 = document.querySelector('#contenedor3');
let peli=""
let page=1;
let totalPages=1

btnBuscar.addEventListener("click", function(pelicula){
    page=1;
    event.preventDefault();
    peli=inputPelicula.value;
    if (peli==""){
        Swal.fire('Por favor ingresa un criterio de busqueda')
    }else{
        cargarPelis(peli,page);
    }
})


const cargarPelis=(peli,page)=>{
    limpiarPantalla();
    const URL=`https://api.themoviedb.org/3/search/movie?page=${page}&api_key=${apiKey}&query=${peli}`;
    fetch(URL).then(respuesta => respuesta.json()).then(datos =>{
        
        console.log(datos);
        console.log(datos.total_pages);
        totalPages=datos.total_pages;


        for(let i = 0; i<datos.results.length ; i++){

            let datosPeli=datos.results[i];
            const peliDiv = document.createElement('div');
            peliDiv.classList.add('peliList');
            let imgPoster=`http://image.tmdb.org/t/p/original${datosPeli.poster_path}`;
            let totalDescripcion=datosPeli.overview.length;
            let descripcion=datosPeli.overview.slice(0,120);
        
            if (datosPeli.poster_path == null) {
               imgPoster="https://image.freepik.com/vector-gratis/ejemplo-vector-tablero-chapaleta-pelicula-icono-video-industria-cinematografica_28461-2.jpg";
            }

        
            if (totalDescripcion > 120) {
                descripcion=`${descripcion}<span id="dots${i}">...</span><span class="moreHide" id="more${i}">${datosPeli.overview.slice(120)}</span></p>
                <button onclick="mostarMas(${i})" class="btn btn-info my-2 my-sm-0" id="myBtn${i}">Read more</button>
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
        if (totalPages>1){
            mostrarNavegacion();
        }
    })
}

const mostarMas=(i)=> {
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

  const limpiarPantalla =()=>{
    contenedor.innerHTML='';
    contenedor3.innerHTML='';

}

const mostrarNavegacion=()=>{
    const nextPage = document.createElement('div');
    nextPage.classList.add('paginacion');
    const peliPages =`
    <button type="button" id="previous" class="btn btn-primary previous" onclick="previousPage()">Previous</button>
    <button type="button" id="next" class="btn btn-primary next" onclick="nextPage()">Next</button>
        `;
        nextPage.innerHTML = peliPages;
        contenedor3.appendChild(nextPage);
//      habilitarBoton();
}




const nextPage=()=>{
    if (page < totalPages){
        page++;
        cargarPelis(peli,page)
    }
//    else{
//        document.getElementById("next").disabled = true;
//    }

    }

const previousPage=()=>{
    if (page > 1){
        page--;
        cargarPelis(peli,page)
    }

 //   if (page == 1){
 //       document.getElementById("previous").disabled = true;
 //   }

}

//const habilitarBoton =()=>{
//  document.getElementById("next").disabled = false;
//}




