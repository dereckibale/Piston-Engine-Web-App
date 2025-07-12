import four_stroke from '../assets/4-stroke.jpg'
import P_V_diagram from '../assets/pv_diagram.png'
import T_S_diagram from '../assets/ts_diagram.png'
function Home(){
let strokes=['Suction stroke', 'Compression stroke', 'Combustion and Expansion stroke', 'Exhaust stroke']
let description = ""
return (
        <div className="homepage-container">
        <h3 style={{textDecoration: "underline"}}>Brief history of <strong>Nikolaus August Otto</strong></h3>
        <h4><strong>Born:</strong> June 14, 1832, in Holzhausen, Germany <br/>Died: January 26, 1891</h4>
        <div>
            <p>
                He is best known for inventing the first 
                practical four-stroke internal combustion engine in <strong>1876</strong>,
                now known as the Otto engine. Inspired by the inefficient 
                Lenoir gas engine of the 1860s, Otto believed he could improve 
                performance by compressing the fuel-air mixture before ignition. 
                Working with engineer Franz Rings and technician Hermann Schumm, 
                he successfully developed an engine that became the foundation 
                of modern gasoline engines used in cars and motorcycles.
                <br/><br/>While Otto himself was not accused of witchcraft, the early years 
                of internal combustion vehicles often triggered fear and suspicion 
                among the public. In rural areas, people unfamiliar with such 
                technology sometimes believed that self-propelled "horseless carriages" 
                were driven by magic or dark forces. A famous example is Bertha Benz’s 
                first long-distance drive in a motorcar based on Karl Benz's design—people 
                were alarmed and sometimes reacted violently. These early reactions reflected 
                a time when technology was advancing faster than public understanding, and 
                anything unfamiliar, especially noisy machines without horses, could be mistaken 
                for something supernatural. Otto’s work not only sparked a mechanical revolution 
                but also challenged society’s perception of innovation in a world still rooted in 
                superstition.
            </p>
            <p>
                <p style={{ textAlign: "center" }}>
                    <img src={four_stroke} alt="4-stroke"/>
                </p>
                {strokes.map((str)=>(
                    <li>
                        <strong>{str}</strong> - {str === "Suction stroke" && "first stroke of the four-stroke engine cycle. It’s when the engine draws in the air-fuel mixture into the combustion chamber."}
                                {str === 'Compression stroke' && " the piston moves upward with both valves closed, compressing the air-fuel mixture. This increases the pressure and temperature inside the cylinder, preparing it for ignition in the next stroke."}
                                {str === 'Combustion and Expansion stroke' && "the spark plug ignites the compressed air-fuel mixture, causing an explosion. This force pushes the piston downward, producing useful mechanical power for the engine."}
                                {str === 'Exhaust stroke' && "the piston moves upward again while the exhaust valve opens. This pushes the burned gases out of the cylinder through the exhaust system, clearing the chamber for the next cycle."}
                    </li>
                ))}
            </p>
            <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '20px',
                            height: '300px',
                            // background: 'gray'
}}>
                <img alt="pv_diagram" style={{ width: '300px', height: '250px', objectFit: 'cover', borderRadius: '8px' }} src={P_V_diagram}/>
                <img alt="ts_diagram" style={{ width: '300px', height: '250px', objectFit: 'cover', borderRadius: '8px' }} src={T_S_diagram}/>
            </div>
            
        </div>
        </div>
    )
}

export default Home;