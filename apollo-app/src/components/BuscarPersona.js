import React, { useEffect } from 'react'
import { useLazyQuery, gql } from "@apollo/client"
import { useState } from "react"

const BuscarPersona = () => {
    const FIND_PERSON_WITH_NAME = gql `
        query($nameToSearch: String!) {
            findPerson(name: $nameToSearch){
                name
                phone
                adress {
                    city
                    street
                }
                id
            }
        }
    `
    const [ getPerson, result ] = useLazyQuery(FIND_PERSON_WITH_NAME)
    const [ persons, setPersons ] = useState([])
    const buscarPersona = event => {
        event.preventDefault()
        const name = event.target.nombrePersona.value
        getPerson({variables: {nameToSearch: name}})
    }

    useEffect(() => {
        if(result.data) setPersons(result.data.findPerson)
    }, [result.data])

    return (
        <form onSubmit={buscarPersona}>
            <input type="text" name="nombrePersona"/>
            <button type="submit">Buscar</button>
            <ul>
                { persons[0]
                        ? persons.map(p => <li key={p.id}>{p.name} ({p.phone}) - {p.adress.street}, {p.adress.city}</li>) 
                        : '' 
                }
            </ul>
        </form>    
    )
}

export default BuscarPersona