import styles from "../404/noUrl.module.css";
import { Link } from "react-router-dom";

const noUrl = () => {
  return (
    <div className={styles.container404}>
        <div>
            <h1 className={styles.error1}>404</h1>
            <img className={styles.img404} src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1687272283/Proyecto%20JS%20vanilla/pngwing.com_1_hpjti6.png" alt="" />
            <h2 className={styles.error2}>This page does not exist.</h2>
            <h3 className={styles.error3}>the page you were looking for cannot be found</h3>
        </div>
        <div>
            <Link to="/home" style={{ textDecoration: 'none' }}>
            <button className={styles.btnError}>GO BACK HOME</button>
            </Link>
        </div>
    </div>
  )
}

export default noUrl