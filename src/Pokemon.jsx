import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Pokemon(){
    const[pokemon, setPokemon] = useState([]);
    const[datosPokemon, setDatosPokemon] = useState([]);

    const[filtroPokemon, setFiltroPokemon] = useState('');
    const [tiposPokemon, setTiposPokemon] = useState(new Set());

    //Se utiliza useEffect para ponerse en contacto con la pokeApi
    //Aqui obtengo los pokemon por fetch API
    //Solo obtengo los nombres de los pokemon y su URL
    useEffect (() => {
        //Creamos una funcion asincrona para asi usar fetch y obtener los datos de los 152 pokemon
        async function getPokemon(){
            const datos = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            let pokemons = await datos.json();
            //Result solo tiene el nombre del pokemon y su URL, entonces nos lo quedamos
            //Porque luego vamos a llamar a esa URL para obtener los datos del pokemon
            setPokemon(pokemons.results);
        }
        //Aqui hago la llamada al metodo para obtener los datos
        //Y que setPokemon se modifique,
        //Esto es como una funcion de js
        getPokemon();
    }, []);

    //Esto es lo mismo que hemos dicho arriba
    useEffect(() => {
        async function getDatosPokemon(){
            /**
             * Para poder hacer un bucle con los datos que hemos obtenido antes
             * es necesario usar Promise.all() que lo que hace es crear promsesas
             * en todo nuestro array y nos devuelve una promesa nueva
             */
            const detallesPokemon = await Promise.all(
                //Recorremos todos los datos guardados
                pokemon.map(async (pokemon) => {
                    //Le decimos que queremos hacer fetch de esta URL
                    const response = await fetch(pokemon.url);
                    //Los datos que nos van a llegar son objetos json, pues asi los codificamos
                    const datos = await response.json();
                    //Aqui retorno los datos que yo quiero obtener
                    return {
                        id: datos.id,
                        name: datos.name.toUpperCase(),
                        type: datos.types[0].type.name,
                        hp: datos.stats[0].base_stat,
                        attack: datos.stats[1].base_stat,
                        defense: datos.stats[2].base_stat,
                        special_attack: datos.stats[3].base_stat,
                        special_defense: datos.stats[4].base_stat,
                        speed: datos.stats[5].base_stat,
                        photo: datos.sprites.front_default
                    }
                })
            );
            //Aqui le doy los datos obtenidos a la constante detallesPokemon
            setDatosPokemon(detallesPokemon);

            //Aqui lo que hago es guardar todos los tipos de pokemon que hay en el set,
            //Para luego mostrarlos en el select
            const tipos = new Set(detallesPokemon.map(pokemon => pokemon.type));
            setTiposPokemon(tipos);
        }
        //Llamo al metodo
        getDatosPokemon();
        //Y le digo que los datos los va a obtener la variable datosPokemon
    }, [datosPokemon]);


    //Lo que hace aqui es la funcion de filtrado de los pokemon, es decir, que lo primero si no se
    //Ha mostrado ningun filtro muestra todos
    const pokemonFiltrado = datosPokemon.filter(pokemon =>
        filtroPokemon === '' || pokemon.type === filtroPokemon
    );

    //Cuando se haga setFiltroPokemon, lo que haremos será darle un valor a filtroPokemon
    //A partir de ese valor que lo que hacemos es en la llamada para pintar los pokemon
    //Es mostrar solo los pokemons que tenemos guardados en nuestro set.

    return (
        <>
        <header>
            <div class="header-container">
                <h1>POKEDEX</h1>
            </div>
        </header>
        <nav>
            <div class="buscar-container">
                <select onChange={(e) => setFiltroPokemon(e.target.value)}>
                <option value="">Todos</option>
                    {[...tiposPokemon].map((tipo) => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                </select>
            </div>
            <div>
                
            </div>
        </nav>
        <main>
            <div className="main-container">
            {pokemonFiltrado.map((pokemon) => (
                <div key={pokemon.id} class="pokemon-card">
                    
                    <p>{pokemon.type.toUpperCase()}</p>
                    <table class="table-pokemon">
                        <tr>
                            <td rowSpan="6" class="td-img">
                            
                                <p>Id: { pokemon.id.toString().padStart(3, "0") }</p>
                                <img src={pokemon.photo}></img><p><b>{pokemon.name}</b></p>
                            </td>
                            <td><p> HP: {pokemon.hp}</p></td>
                        </tr>
                        <tr>
                            <td><p> Ataque: {pokemon.attack}</p></td>
                        </tr>
                        <tr>
                            <td><p> Defensa: {pokemon.defense}</p></td>
                        </tr>
                        <tr>
                            <td><p> Ataque especial: {pokemon.special_attack}</p></td>
                        </tr>
                        <tr>
                            <td><p> Defensa especial: {pokemon.special_defense}</p></td>
                        </tr>
                        <tr>
                            <td><p> Velocidad: {pokemon.speed}</p></td>
                        </tr>
                    </table>
                </div>
            ))}
                
            </div>
        </main>
        
        </>
    );
}

export default Pokemon;