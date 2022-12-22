import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ListPokemons from '../components/ListPokemons';
import { paginationLogic } from '../helpers/paginationLogic';
import './styles/Pokedex.css'

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [types, setTypes] = useState([]);
  const [namePokemon, setNamePokemon] = useState('');
  const [pokemonFilter, setPokemonFilter] = useState([]);
  const [pokemonType, setPokemonType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const {pagesInBlock, lastPage, pokemonsInPage} = paginationLogic(currentPage, pokemonFilter);

  const nameTrainer = useSelector(state => state.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    const namePokemon = e.target.namePokemon.value;
    setNamePokemon(namePokemon);
  }

  const handleChangeSelect = (e) => {
    setPokemonType(e.target.value);
  }

  const handleClickPage = (newPage) => {
    console.log(newPage);
    setCurrentPage(newPage);
  }

  const handleNextpage = () => {
    const newPage = currentPage + 1;

    if(newPage > lastPage){
      setCurrentPage(1);
    }else{
      setCurrentPage(newPage);
    }
  }

  const handlePreviouspage = () => {
    const newPage = currentPage - 1;

    if(newPage < 1){
      setCurrentPage(lastPage);
    }else{
      setCurrentPage(newPage);
    }
  }

  const handleFirstPage = () => {
    setCurrentPage(1);
  }

  const handleLastpage = () => {
    setCurrentPage(lastPage);
  }


  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/${pokemonType ? `type/${pokemonType}/` : 'pokemon/?limit=100'}`;
    axios.get(URL)
      .then(({ data }) => {
        if(pokemonType){
          const newPokemons = data.pokemon.map(pokemon => pokemon.pokemon);
          setPokemons(newPokemons);
        }else{
          setPokemons(data.results);
        }
      })
      .catch(err => console.log(err))
  }, [pokemonType]);

  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type/';

    axios.get(URL)
      .then(({ data }) => setTypes(data.results))
      .catch(err => console.log(err))
  }, [])


  useEffect(() => {
    const newPokemons = pokemons.filter(pokemon => pokemon.name.includes(namePokemon));
    setPokemonFilter(newPokemons);
  }, [namePokemon, pokemons])




  return (
    <main>
      <header className='pokedex__header'>
        <p className='pokedex_txt'><span>Welcome  {nameTrainer}</span>, here you can find your favorite pokemon</p>

        <form onSubmit={handleSubmit} className='pokedex__form'>
          <div className='pokedex__search'>
            <input className='pokedex__input' type="text" id='namePokemon' placeholder='Search for a Pokémon'/>
            <button className='pokedex__btn' type='submit'>Search</button>
          </div>
          <select className='pokedex__select' onChange={handleChangeSelect}>
            <option value="">All Pokemons</option>

            {
              types.map(type => <option value={type.name} key={type.url}>{type.name}</option>)
            }
          </select>
        </form>
      </header>

      <ListPokemons pokemons={pokemonsInPage} />

      <ul className='pokedex__listPages'>
        <li onClick={handlePreviouspage}>{'<'}</li>
        <li onClick={handleFirstPage}>...</li>
        {
          pagesInBlock.map(pageInBlock => (
            <li className={currentPage === pageInBlock && 'actualPage'} key={pageInBlock} onClick={() => handleClickPage(pageInBlock)}>{pageInBlock}</li>
          ))
        }
        <li onClick={handleLastpage}>...</li>
        <li onClick={handleNextpage}>{'>'}</li>
      </ul>
    </main>
  )
}

export default Pokedex