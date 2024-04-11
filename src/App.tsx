import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const getPokemon = async (pokemon: string) => {
    try {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result); //api data here
    const toArray: any = [];
    toArray.push(result, ...pokemonData);
    setPokemonData(toArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    getPokemon(inputRef.current!.value);
  }

  //Not needed, handleClick instead
  /*useEffect(() => {
    getPokemon();
  }, [pokemon]);*/

  return (
    <>
    <h1>Pokemon list!</h1>
      <input ref={inputRef} defaultValue={"Pikachu"}></input>
      <button onClick={() => handleClick()}>Get pokemon</button>
      {pokemonData.map((pokemon: any) => (
        <div key={pokemon.id}>
          <img src={pokemon.sprites.front_default}></img>
          <p>Name: {pokemon.name}</p>
        </div>
      ))}
    </>
  );
}

export default App
