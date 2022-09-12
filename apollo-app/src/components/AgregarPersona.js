import React from 'react'
import { gql, useMutation } from "@apollo/client";

const AgregarPersona = () => {
    const AGREGAR_PERSON = gql `
        mutation($name: String!, $phone: String, $street: String!, $city: String!) {
            addPerson(
                name: $name,
                phone: $phone,
                street: $street,
                city: $city
            ) {
                name,
                phone
            }
        }
    `
    const [addPerson] = useMutation(AGREGAR_PERSON)
    const agregarPersona = async event => {
        event.preventDefault()
        const form = event.target;
        const variables = {name: form.name.value, phone: form.phone.value, street: form.street.value, city: form.city.value}
        const res = await addPerson({variables})
        const personAdded = res.data.addPerson
        alert(`Agregado con éxito: ${personAdded.name}${personAdded.phone ? ` (${personAdded.phone})` : ''}`)
    }
    return (
        <form onSubmit={agregarPersona}>
            <input name="name" placeholder="Name" required/>
            <input name="phone" placeholder="Phone"/>
            <input name="street" placeholder="Street" required/>
            <input name="city" placeholder="City" required/>
            <button type="submit">Agregar</button>
        </form>
    )
}

export default AgregarPersona