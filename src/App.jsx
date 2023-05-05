import "./App.css";
import "./Pokemon.css"
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        const pokemonSpecies = response.data.species.name;
        const pokemonImageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${padNumber(response.data.id)}.png`;
        setPokemon({
          name: pokemonName,
          species: pokemonSpecies,
          img: pokemonImageUrl,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  // Helper function to pad the Pokemon's ID number with zeros to 3 digits
  const padNumber = (number) => {
    return number.toString().padStart(3, "0");
  };

  return (
    <div className="App">
      <div className="TitleSection">
        <h1> Pokemon's Info </h1>
        <input
          type="text" placeholder="example: charmander"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1> Please search a Pokemon to get its card</h1>
        ) : (
          <>
            <div className="PokemonCard">
              <h1>{pokemon.name}</h1>
              <img src={pokemon.img} alt={pokemon.name} />
              <h3>Species: {pokemon.species}</h3>
              <h3>Type: {pokemon.type}</h3>
              <h4>Hp: {pokemon.hp}</h4>
              <h4>Attack: {pokemon.attack}</h4>
              <h4>Defense: {pokemon.defense}</h4>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
