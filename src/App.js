import React, { useState, useEffect } from 'react';
import Frase from './components/Frase';
import styled from '@emotion/styled';

//REST API

/* ENDPOINTS = para hacer operaciones CRUD

  GET /clientes -> listar todos los clientes
  POST /clientes -> Crear un nuevo cliente
  PUT /clientes/3 -> Editar un cliente
  DELETE /clientes/8 -> Borrar un cliente 
*/
/*CONULTAR API'S CON REACT
  3 formas mas comunes
  Fetch API y Ajax (Nativo de JS) fetch -> toma la url que voy a ahcer la consulta, funciona con promises
  Axios
  jQuery Ajax
*/
const Contenedor = styled.div`
  display: flex;
  align-items: center;
  padding-top: 5rem;
  flex-direction: column;
`;

const Boton = styled.button`
  background: -webkit-linear-gradient(top left, #007d35 0%, #007d35 40%, #0f574e 100%);
  background-size: 300px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  transition: background-size .5s ease;

  :hover {
    cursor: pointer;
    background-size: 400px;
  }
`;

function App() {

  //stae de frases
  const [ frase, guardarFrase ]= useState({});

  /* async await
  await = deten la ejecucion del codigo hasta que se complete esa linea y lo pasas a una const ucando esta listo
  el .then no es necesario

  */
  const consultarAPI = async () => {
    const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    const frase = await api.json();
    guardarFrase(frase[0]);
  }

  /* Esta es una forma de hacerlo, hay otra ejor con el async
  const consultarAPI = () => {
    const api = fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    
    //Cuando en la consola sigue saliendo pending, le falta otro .then
    
    const frase = api.then( respuesta => respuesta.json());
    frase.then(resultado => console.log(resultado));
  }
  */
 
  //Cargr una frase
  useEffect (() => {
    consultarAPI()
  }, []);

  return (
    <Contenedor>
      <Frase 
        frase ={frase}
      />

      <Boton
        onClick={consultarAPI}
      >
        Obtener Frase
      </Boton>
    </Contenedor>
  );
}

export default App;
