import React from 'react'
import { Link } from 'react-router-dom'


function NavigationLinks() {
  return (
    <>
        <Link to="/" className="nav-link">Home</Link>
        <span className="divider">|</span>
        <Link to="/invest" className="nav-link">Invest</Link>
        <span className="divider">|</span>
        <Link to="/fundraising" className="nav-link">Fund raise</Link>
        <span className="divider">|</span>
        <Link to="/stories" className="nav-link">Blogs</Link>
        <span className="divider">|</span>
        <Link to="/about" className="nav-link">About Us</Link>
        <span className="divider">|</span>
        <Link to="/contact" className="nav-link">Contact Us</Link>
    </>
  )
}

export default NavigationLinks;