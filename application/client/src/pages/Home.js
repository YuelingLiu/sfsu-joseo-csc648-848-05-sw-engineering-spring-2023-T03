import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'


function Home() {
  return (
    <div>
        <h1 className='names'>Software Engineering Class SFSU Spring 2023 Section 5 Team 3</h1>
        <div className='names'>
            <Link to="/YuelingLiu">
                <h2>Yueling Liu </h2>
            </Link>
            <Link to="/DuncanHerington" >
                <h2> Duncan Herington </h2>
            </Link>
            <Link to="/MarcelAzouri">
                <h2>Marcel Azouri</h2>
            </Link>
            <Link to="/PriyaPradeep">
                <h2>Priya Pradeep </h2>
            </Link>
            <Link to="/NathanLeHowland">
                <h2>Nathan Le Howland </h2>
            </Link>
            <Link to="/SamuelElias">
                <h2>Samuel Elias </h2>
            </Link>
            <Link to="/YassonHaddish">
                <h2>Yasson Haddish</h2>
            </Link>
        </div>
    </div>
  )
}

export default Home