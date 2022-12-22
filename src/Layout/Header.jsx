import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainerGloba } from '../store/slices/nameTrainer.slice'
import './styles/Header.css'

const Header = () => {
  const dispatch = useDispatch()

  const handleClickLogout = () => {
    dispatch(setNameTrainerGloba(''));
  }

  return (
    <header className='header'>
      <img src="/img/logo.png" alt="logo" className='header__img' />
      <div className="header__black"></div>
      <div className="header__circle">
        <div className="header__circle-int">
          <i class='bx bx-exit header__logout' onClick={handleClickLogout}></i>

        </div>
      </div>
    </header>
  )
}

export default Header