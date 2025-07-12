import Header from "./Components/Header.js";
import Home from "./Components/Home.js";
import Formulas from "./Components/Formulas.js"
import Footer from "./Components/Footer.js";
import Calculator from './Components/Calculator.js'
import './App.css'
function App() {

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <Home />          
        <Formulas/>
        <Calculator />
      </div>
      <Footer />
    </div>
  );
}

export default App;
