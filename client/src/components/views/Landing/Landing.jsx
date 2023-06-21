import styles from "./landing.module.css";
import { Link } from "react-router-dom";


const landing = () => {
  return (
      <div className={styles.containerPortada}>
        <div className={styles.capaGradient}></div>
        <div className={styles.containerDetails}>
          <div className={styles.details}>
            <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686013007/cdnlogo.com_f1-new_ixder8.svg" alt="" />
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
