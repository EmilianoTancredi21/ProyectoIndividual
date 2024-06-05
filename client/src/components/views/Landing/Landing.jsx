import styles from "./landing.module.css";
import { Link } from "react-router-dom";

const landing = () => {
  return (
    <div className={styles.backgroundLanding}>
      <div className={styles.capaGradient}></div>
      <div className={styles.containerDetails}>
        <div className={styles.details}>
          <img
            src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1716403525/F1.svg_nrcjhm.png"
            alt=""
          />
          <p>All information in one place</p>
          <div className={styles.btn}>
            <Link to="/home">
              <button>Join</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default landing;
