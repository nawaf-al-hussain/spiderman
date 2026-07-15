import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo">THE AMAZING <span>SPIDER-MAN</span></div>

      <ul className="nav-links">
        <li>New York</li>
        <li>Peter Parker</li>
        <li>The Villains</li>
        <li>The Mission</li>
      </ul>
    </nav>
  )
}

export default Navbar