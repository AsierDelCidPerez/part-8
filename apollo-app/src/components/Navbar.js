import React from 'react'
import { Link } from 'react-router-dom'

const stylePadding = {
    padding: 10
}

const Navbar = () => (
        <nav>
            <Link to='/' style={stylePadding}>Home</Link>
            <Link to='/agregar-persona' style={stylePadding}>Agregar persona</Link>
            <Link to='/buscar-persona' style={stylePadding}>Buscar persona</Link>
        </nav>
)

export default Navbar

