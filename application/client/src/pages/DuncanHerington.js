import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
function DuncanHerington() {
  return (
    <div>
      <Link to="/">
        Home page
      </Link>

      <h2 className='names'>Duncan Herington</h2>
      <h4 className='names'>
        Hello, my name is Duncan Herington and I am a computer science major, My biggest passion is trophy hunting in video games or playing FPS games such as COD and Valorant. In addition, 
        I am passionate about baseball, and Star Wars. If I wasn't studying computer science, I would likely be studying finance. Finance is a field that has always interested me. It provides 
        the opportunity to understand and manage money, and the ability to analyze economic trends.
      </h4>
    </div>
  )
}

export default DuncanHerington;