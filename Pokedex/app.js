const colores = {
    fire:'#ffb703',
    grass:'#aacc00',
    electric:'#1d3557',
    water:'#219ebc',
    ground:'#7f5539',
    rock:'#343a40',
    fairy:'#ffc6ff',
    poison:'#b7094c',
    bug:'#2b9348',
    dragon:'#d00000',
    psychic:'#e5989b',
    flying:'#bde0fe',
    fighting:'#e07a5f',
    normal:'#e5e5e5',
    
}

const tipoPrincipal = Object.keys(colores);

const contenedor = document.querySelector('#contenedor');
const numeroDePokemons = 150; 

const esperarPokemon = async () => {
    for(let i = 1; i<= numeroDePokemons; i++){
        await obtenerPokemon(i);
    }
}

const obtenerPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const respuesta = await fetch(url);
    const pokemon = await respuesta.json();
    crearCarta(pokemon);
}

const crearCarta = (pokemon) => {
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('pokemon');
    const tipoPokemon = pokemon.types.map(type => type.type.name);
    const tipo = tipoPrincipal.find(type => tipoPokemon.indexOf(type) > -1);
    const nombre = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colores[tipo];
    pokemonDiv.style.backgroundColor = color;
    const pokemonHTML = `
        <div class="imgContenedor">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
        </div>
        <div class="informacion">
            <span class="numeroPokemon">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="nombrePokemon">${nombre}</h3>
            <h4 class="tipo">Tipo: ${tipo}</h4>
        </div>
    `;

    pokemonDiv.innerHTML = pokemonHTML;

    contenedor.appendChild(pokemonDiv);

}

esperarPokemon();

