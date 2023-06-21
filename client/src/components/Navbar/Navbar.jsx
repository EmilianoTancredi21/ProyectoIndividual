import styles from "../Navbar/Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";
import App from "../../App"


const Navbar = () => {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navbarLogo}>
        <Link to="/">
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686419783/Proyecto%20JS%20vanilla/logo-f1-liberty-soymotor_un04ho.jpg" alt="Logo" />
        </Link>
        </div>
        <div className={styles.navbarLinks}>
          <Link to="/home" element={<App/>} style={{ textDecoration: 'none' }}>Home</Link>
          <Link to="/createDriver">Make Driver</Link>
        </div>
        <div>
        <SearchBar  />
        </div>
      </nav>
    );
  }

export default Navbar