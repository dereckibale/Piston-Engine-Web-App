import { useEffect, useState } from "react";

function Data({formulas_received, categories_received, variables_received}) {

  
  useEffect(()=>{
    fetch('http://localhost:3000/formulas')
    .then((res)=> res.json())
    .then((formulas)=> formulas_received(formulas)).catch((err)=>console.error("Error!"))
  }, [])

  useEffect(()=>{
    fetch('http://localhost:3000/categories')
    .then((res)=> res.json())
    .then((categories)=> categories_received(categories)).catch((err)=>console.error("Error!"))
  }, [])

  useEffect(()=>{
    fetch('http://localhost:3000/variables')
    .then((res)=> res.json())
    .then((variables)=> variables_received(variables)).catch((err)=>console.error("Error!"))
  }, [])
  return null //because there is nothing to return or deliver, just pass data from backend to frontend
}


export default Data;