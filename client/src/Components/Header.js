import piston_logo from '../assets/piston-logo.webp'

function Header() {
  return (
    <div className="header-container">
      <h2 className="title">
        Piston Engine
        <img
          alt="Piston logo"
          src={piston_logo}
          style={{ maxWidth: "50px", height: "auto", marginLeft: "10px" }}
        />
      </h2>
    </div>
  );
}

export default Header;
