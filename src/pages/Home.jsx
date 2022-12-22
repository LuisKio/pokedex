import React from 'react'
import FormHome from '../components/FormHome'
import './styles/Home.css'

const Home = () => {
    return (
        <main className='home'>
            <img className='home__img' src="./img/logo.png" alt="pokedex" />
            <h2 className='home__subtitle'>Hi, trainer!</h2>
            <p className='home__txt'>Give me your name to start!</p>
            <FormHome />
        </main>
    )
}

export default Home