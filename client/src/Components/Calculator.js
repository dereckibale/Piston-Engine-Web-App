import {useState, useRef} from 'react'

function Calculator(){
    const [thermal_efficiency, setThermal_Efficiency] = useState(0)
    const [compression_ratio, setCompression_Ratio] = useState(0)
    const [w_net, setW_Net] = useState(0)
    const [specific_heat_ratio, setSpecific_Heat_Ratio] = useState(0)
    const [p1, setP1] = useState(0)
    const [p2, setP2] = useState(0)
    const [p3, setP3] = useState(0)
    const [p4, setP4] = useState(null)
    const [T1, setT1] = useState(null)
    const [T2, setT2] = useState(null)
    const [T3, setT3] = useState(null)
    const [T4, setT4] = useState(null)

    let arrays_of_answers = [thermal_efficiency, compression_ratio, w_net,  specific_heat_ratio, 
        p1, p2, p3, p4, T1, T2, T3, T4]
    let variable_names = ["Thermal Efficiency", "Compression Ratio", "Work_net", "Specific Heat Ratio",
         "Pressure @point 1", "Pressure @oint 2", "Pressure @point 3", "Pressure @point4",
        "Temperature @pt.1 in Kelvin", "Temperature @pt.2 in Kelvin", "Temperature @pt.3 in Kelvin", "Temperature @pt.4 in Kelvin"]
    let thermalEfficiency = useRef(0)
    let compressionRatio = useRef(0)
    let Wnet = useRef(0)
    let sp_heat_ratio = useRef(0)
    let P1=useRef(0)
    let P2 = useRef(0)
    let P3 = useRef(0)
    let P4 = useRef(0)
    let t1 = useRef(300)
    let t2 = useRef(0)
    let t3 = useRef(0)
    let t4 = useRef(0)


    function input_thermal_efficiency(e){
        thermalEfficiency.current = parseFloat(e.target.value)
        console.log(thermalEfficiency.current)
    }

    function input_compression_ratio(e){
        compressionRatio.current = parseFloat(e.target.value)
        console.log(compressionRatio)
    }

    function input_Wnet(e){
        Wnet.current = parseFloat(e.target.value)
        console.log(Wnet.current)
    }

    function input_p1(e){
        P1.current = parseFloat(e.target.value)
        console.log(P1.current)
    }

    function input_p2(e){
        P2.current = parseFloat(e.target.value)
        console.log(P2.current)
    }

    function input_p3(e){
        P3.current = parseFloat(e.target.value)
        console.log(P3.current)
    }

    function input_p4(e){
        P4.current = parseFloat(e.target.value)
        console.log(P4.current)
    }


    function input_lambda(e){
        sp_heat_ratio.current = parseFloat(e.target.value)
       
    }

    function input_T1(e){
        t1.current = parseFloat(e.target.value)
       
    }

    function input_T2(e){
        t2.current = parseFloat(e.target.value)
      
    }

    function input_T3(e){
        t3.current = parseFloat(e.target.value)
      
    }

    function input_T4(e){
        t4.current = parseFloat(e.target.value)
      
    }

    function solve_everything(e){
        let Cv = 0.718
        if(sp_heat_ratio.current && compressionRatio.current){
           let thermal_eff = 0
           thermal_eff = 1 - (1 / Math.pow(compressionRatio.current, sp_heat_ratio.current - 1));
           setThermal_Efficiency(thermal_eff)

           let r = compressionRatio.current;
            let gamma = sp_heat_ratio.current;
//this comment is being added

            setT1(t1.current)
            // Isentropic compression: T2 = T1 * r^(γ-1)
            t2.current = t1.current * Math.pow(r, gamma - 1);
            setT2(t2.current)

            // Assume a fixed max temp rise (e.g. heat addition raises T3)
            t3.current = 1000; // e.g. 1000K peak temp
            setT3(t3.current)
            // Isentropic expansion: T4 = T3 / r^(γ-1)
            t4.current = t3.current / Math.pow(r, gamma - 1);
            setT4(t4.current)  
            
          let worknet = Cv * ((t3.current - t2.current) - (t4.current - t1.current))
            setW_Net(worknet);
            console.log(worknet)
        } 

        if (thermalEfficiency.current && sp_heat_ratio.current) {
            let eta = thermalEfficiency.current;
            let gamma = sp_heat_ratio.current;

            if (eta < 1) {
                const r = Math.pow(1 / (1 - eta), 1 / (gamma - 1));
                setCompression_Ratio(r);
                }
        }

        if(p1 && p2){

        }

        //Solve for:
            //p_1
            //p_2
            //p_3
            //p_4

    }

    return (
        <div className="calculator-container">
            <div>
                <p><strong>Calculator</strong> <br/>Input any data available</p>
                <p>*take note: Thermal Efficiency is dependent on Compression Ratio <br/>
                    Air has specific heat @ constant volume: 0.718 kJ/kg.K
                </p>

                <p style={{fontStyle: 'italic', color: 'red'}}>Warning! **this calculator is still on development mode. miscalculations due to high input may occur**</p>
                
            </div>
            <div >
                    <input type="number" placeholder="Thermal Efficiency (0-1)" onChange={input_thermal_efficiency}></input>
                    <input type="number" placeholder="Compression ratio " onChange={input_compression_ratio}></input>
                    <input type="number" placeholder="W_net" onChange={input_Wnet}></input>
                    <input type="number" placeholder="P1" onChange={input_p1}></input>
                    <input type="number" placeholder="P2" onChange={input_p2}></input>
                    <input type="number" placeholder="P3" onChange={input_p3}></input>
                    <input type="number" placeholder="P4" onChange={input_p4}></input>
                    <input type="number" placeholder="γ: (1.4 for Air)" onChange={input_lambda}></input>
                    <input type="number" placeholder="Temperture @point1 in Kelvin" onChange={input_T1}></input>
                    <input type="number" placeholder="Temperture @point2 in Kelvin" onChange={input_T2}></input>
                    <input type="number" placeholder="Temperture @point3 in Kelvin" onChange={input_T3}></input>
                    <input type="number" placeholder="Temperture @point4 in Kelvin" onChange={input_T4}></input>
                    
            </div>
            <button onClick={solve_everything} style={{marginBottom: '10px', cursor: 'pointer'}}>Solve!</button>
           
            {(thermal_efficiency || compression_ratio || w_net || specific_heat_ratio || p1 || p2 || p3 || p4) && (
                <div className="answers-container">
                    <ul>
                    {arrays_of_answers.map((item, index) => 
                     item ? (
                        <li key={index}>
                            <strong>{variable_names[index]} :</strong> {item}
                        </li>
                        ) : null
                    )}
                    </ul>
                </div>
                )}
            
            
            
        
        </div>
    )

}
export default Calculator