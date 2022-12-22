import React from 'react'
import { useDispatch } from 'react-redux';
import { setNameTrainerGloba } from '../store/slices/nameTrainer.slice';
import './style/FormHome.css'

const FormHome = () => {
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const nombre = e.target.nameTrainer.value.trim();
        dispatch(setNameTrainerGloba(nombre));
    }

    return (
        <form className='home__form' onSubmit={handleSubmit}>
            <input
                type="text"
                id='nameTrainer'
                placeholder='Your name...'
                className='home__input'
            />
            <button className='home__button'>Start!</button>
        </form>
    )
}

export default FormHome