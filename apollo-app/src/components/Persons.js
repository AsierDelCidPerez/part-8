import React from 'react'

const Persons = ({ persons }) => {
    return (
    <ul>
        {persons.map(p => <li key={p.id}>{p.name} ({p.phone ? p.phone : 'No registrado'}) - ({p.adress.city})</li>)}
    </ul>
    )
}

export default Persons