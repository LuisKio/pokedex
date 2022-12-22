import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Layout/Header';

const RouteProtected = () => {
  const nameTrainer = useSelector(state => state.nameTrainer);

  if (nameTrainer) {
    //Outlet el elemento que se esta renderizando.
    return (
      <>
        <Header />
        <Outlet />
      </>
    )
  } else {
    //Redirecciona al home
    return <Navigate to='/'/>
  }
}

export default RouteProtected