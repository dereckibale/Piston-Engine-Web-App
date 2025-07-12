import Data from './Data.js'
import {useState} from 'react';
function Formulas(){
  const [formulas, setFormulas] = useState([])
  const [variables, setVariables] = useState([])
  const [categories, setCategories] = useState([])
    return (
        <>
         <Data formulas_received={(data)=> setFormulas(data)}
              categories_received={(data)=> setCategories(data)}
              variables_received = {(data)=> setVariables(data)}
          />
          
          <div>
            {formulas.length !== 0  ? (<ul>
          {formulas.map((item)=>(
            <li key={item.id}>
              <strong>{item.name}</strong>
              <p>{item.symbol} - {item.description}</p>
            </li>
            ))}
        </ul>) : <h3>No formulas fetched from server</h3>}
          </div>
        <h3 style={{marginLeft: '10px', textDecoration: "underline"}}>Define Variables</h3>
          <div>
            {variables.length !== 0 ? 
            (<ul>
                {variables.map((item)=>(
                  <li key={item.id}>
                    <p><strong>{item.symbol}</strong> : {item.name} - {item.description}</p>
                  </li>
                ))}
             </ul>)
            : <h3>No variables are fetched from the server</h3>}
          </div>
        </>
       
    )
}

export default Formulas;