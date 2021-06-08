import React from 'react';
import{useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Registrar(props) {

  const [datos, setData]= useState([]);

  useEffect(()=>{
    peticionesget();
  }, [])
  const peticionesget=async()=>{
    await axios.get('http://localhost:8000/api/vehiculos/'+props.location.state.id).then(res=>{
console.log(res)
setData(res.data);
  })}
    console.log(props.location.state.id)
  return (
    <div>
      Welcome to the Home Page!
    </div>
  );
}

export default Registrar;
