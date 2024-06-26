import axios from "axios";
import styles from "../Details/Details.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import App from "../../../App";

// const URL = "http://localhost:3001";

const URL = "https://drivers-zmnv.onrender.com";

const noImage =
  "https://i.pinimg.com/736x/a4/fc/6c/a4fc6c0d3d05fe453cdbafba248ae20c.jpg";
const noDescription = "A great driver!";

const Details = () => {
  const { id } = useParams();
  const [driver, setDriver] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/drivers/${id}`);
        const data = response.data;
        if (Object.keys(data).length === 0) {
          setDriver(null);
        } else {
          setDriver(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.back}>
      <div className={styles.detailDriver}>
        <div className={styles.container}>
          {driver && Object.keys(driver).length !== 0 ? (
            <>
              <div className={styles.containerImg}>
                <img
                  src={driver.image?.url || driver.image || noImage}
                  alt="Driver"
                  className={styles.image}
                />
              </div>
              <div className={styles.driverInfo}>
                <h1 className={styles.fullName}>
                  {driver.name
                    ? `${driver.name.forename} ${driver.name.surname}`
                    : `${driver.forename} ${driver.surname}`}
                </h1>
                <h2 className={styles.titleID}>
                  Driver ID:{" "}
                  <span className={styles.subtitle}>{driver.id}</span>
                </h2>
                <h2 className={styles.title}>
                  Nationality:{" "}
                  <span className={styles.subtitle}>{driver.nationality}</span>
                </h2>
                <h2 className={styles.title}>Description:</h2>
                <h2 className={styles.description}>
                  {driver.description || noDescription}
                </h2>
                <h2 className={styles.title}>
                  Date of birth:{" "}
                  <span className={styles.subtitle}>{driver.dob}</span>
                </h2>
                <h2 className={styles.teams}>
                  Teams:{" "}
                  <span className={styles.subtitle}>
                    {driver.teams
                      ? driver.teams
                      : driver.Teams?.map((teams) => teams.name).join(", ")}
                  </span>
                </h2>

                <div>
                  <button>
                    <Link
                      to="/home"
                      element={<App />}
                      style={{ textDecoration: "none" }}
                      className={styles.buttonDetail}
                    >
                      Go back
                    </Link>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h2 className={styles.noDrivers}>No drivers found.</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;
