import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Create({ nuevoPokemon }) {

    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState({
        name: '',
        type: '',
        hp: '',
        attack: '',
        defense: '',
        speacial_attack: '',
        special_defense: '',
        speed: '',
        photo: ''
    });

    //Esto se le llama en un onchange en el input y lo que crea es un objeto pokemon.
    // donde e.target.name es la clave nombre del input y e.target.value, el valor tomado
    const handleChange = (e) => {
        setPokemon({ ...pokemon, [e.target.name]: e.target.value});
    }

    const agregar = (e) => {
        e.preventDefault();
        nuevoPokemon(pokemon);
        navigate('/');
    }

    return(
        <>
            <div>
                <h1>Formulario de nuevo pokemon</h1>
                <form onSubmit={agregar}>
                    <label>Nombre del pokemon</label>
                    <input type="text" name="name" placeholder="Nombre del pokemon" onChange={handleChange}/><br></br><br></br>
                    <label>Tipo del pokemon</label>
                    <input type="text" name="type" placeholder="Tipo del pokemon" onChange={handleChange} /><br></br><br></br>
                    <label>Salud del pokemon</label>
                    <input type="number" name="hp" placeholder="Salud del pokemon" onChange={handleChange} /><br></br><br></br>
                    <label>Ataque del pokemon</label>
                    <input type="number" name="attack" placeholder="Atque del pokemon" onChange={handleChange} /><br></br><br></br>
                    <label>Defensa del pokemon</label>
                    <input type="number" name="defense" placeholder="Defensa del pokemon" onChange={handleChange} /><br></br><br></br>
                    <label>Ataque especial del pokemon</label>
                    <input type="number" name="special_attack" placeholder="Ataque especial del pokemon" onChange={handleChange} /><br></br><br></br>
                    <label>Defensa especial del pokemon</label>
                    <input type="number" name="special_defense" placeholder="Defensa especial del pokemon" onChange={handleChange} /><br></br><br></br>
                    <label>Velocidad del pokemon</label>
                    <input type="number" name="speed" placeholder="velocidad del pokemon" onChange={handleChange} /><br></br><br></br>
                    <label>Foto del pokemon</label>
                    <input type="text" name="photo" placeholder="Foto del pokemon" onChange={handleChange} /> <br></br><br></br>
                    <input type="submit" value="Crear pokemon" />
                </form>
                <Link to="/">Volver</Link>
            </div>

        </>

    );
}

export default Create;