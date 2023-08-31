import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styles from "../Form/Form.module.css";
import { GetAllTeams } from "../../../Redux/actions/actions";

const FormPage = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const allTeams = new Set(teams.flat());
  const allTeams2 = [...allTeams];

  const [selectedTeams, setSelectedTeams] = useState([]);

  const URL = "https://pi-server-jyus.onrender.com";

  const [driver, setDriver] = useState({
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    image: "",
    description: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(GetAllTeams());
  }, []);

  const validateField = (fieldName) => {
    let error = "";
    const value = driver[fieldName].trim();

    if (value === "") {
      error = `El campo ${fieldName} es obligatorio.`;
    } else if (fieldName === "forename" || fieldName === "surname") {
      const containsNumbers = /\d/.test(value);
      if (containsNumbers) {
        error = `El campo ${fieldName} no puede contener números.`;
      }
    } else if (fieldName === "description") {
      if (value.length < 15) {
        error = "La descripción debe tener al menos 15 caracteres.";
      }
    }

    return error;
  };

  const validateFields = () => {
    const errors = {};

    Object.keys(driver).forEach((fieldName) => {
      const error = validateField(fieldName);
      if (error !== "") {
        errors[fieldName] = error;
      }
    });

    setValidationErrors(errors);
  };

  const handleFieldChange = (fieldName, value) => {
    setDriver((prevDriver) => ({
      ...prevDriver,
      [fieldName]: value,
    }));
  };

  useEffect(() => {
    validateFields();
  }, [driver]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedTeams((prevTeams) => [...prevTeams, value]);
    } else {
      setSelectedTeams((prevTeams) =>
        prevTeams.filter((team) => team !== value)
      );
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    validateFields();

    if (
      Object.keys(validationErrors).length > 0 ||
      selectedTeams.length === 0
    ) {
      return;
    }

    try {
      const teamNames = selectedTeams;

      const response = await axios.post(`${URL}/drivers`, {
        forename: driver.forename,
        surname: driver.surname,
        description: driver.description,
        image: driver.image,
        nationality: driver.nationality,
        dob: driver.dob,
        teams: teamNames.join(","),
      });

      alert("Elemento creado correctamente");
      console.log("Elemento creado correctamente", response.data);
      console.log("Equipos:", response.data.Teams);

      setDriver({
        forename: "",
        surname: "",
        nationality: "",
        dob: "",
        image: "",
        description: "",
      });

      setError(null);
      setValidationErrors({});
    } catch (error) {
      if (error.response.data.error === "The driver already exists") {
        alert(
          "Error: El conductor con el nombre y apellido ingresado ya existe en la base de datos"
        );
      } else {
        console.error("Error al crear el elemento", error.response.data);
        setError("Error al crear el elemento");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.photo}>
        <img
          src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686839039/Proyecto%20JS%20vanilla/max-verstappen-anniversary-win-2020-scaled_q7vgkj.jpg"
          alt=""
        />
      </div>
      <div className={styles.form}>
        <div className={styles.driverForm}>
          <h1 className={styles.titleForm}>Enter a new driver!</h1>
          <form onSubmit={handleFormSubmit}>
            <div className={styles.formField}>
              <label htmlFor="forename">Forename:</label>
              <input
                type="text"
                id="forename"
                name="forename"
                value={driver.forename}
                placeholder="Driver name..."
                onChange={(e) => handleFieldChange("forename", e.target.value)}
              />
              {validationErrors.forename && (
                <span className={styles.error}>
                  {validationErrors.forename}
                </span>
              )}

              <label htmlFor="surname">Surname:</label>
              <input
                type="text"
                id="surname"
                name="surname"
                value={driver.surname}
                placeholder="Driver surname..."
                onChange={(e) => handleFieldChange("surname", e.target.value)}
              />
              {validationErrors.surname && (
                <span className={styles.error}>{validationErrors.surname}</span>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={driver.nationality}
                placeholder="Driver nationality..."
                onChange={(e) =>
                  handleFieldChange("nationality", e.target.value)
                }
              />
              {validationErrors.nationality && (
                <span className={styles.error}>
                  {validationErrors.nationality}
                </span>
              )}

              <label htmlFor="image">Image:</label>
              <input
                type="text"
                id="image"
                name="image"
                value={driver.image}
                placeholder="Url image..."
                onChange={(e) => handleFieldChange("image", e.target.value)}
              />
              {validationErrors.image && (
                <span className={styles.error}>{validationErrors.image}</span>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={driver.dob}
                onChange={(e) => handleFieldChange("dob", e.target.value)}
              />
              {validationErrors.dob && (
                <span className={styles.error}>{validationErrors.dob}</span>
              )}

              <label htmlFor="description">Description:</label>
              <textarea
                value={driver.description}
                placeholder="Driver description..."
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
              ></textarea>
              {validationErrors.description && (
                <span className={styles.error}>
                  {validationErrors.description}
                </span>
              )}
            </div>

            <div className={styles.formField}>
              <label htmlFor="teams" className={styles.checkboxLabel}>
                Teams:
              </label>
            </div>
            <div className={styles.checkboxContainer}>
              <div className={styles.checkboxListContainer}>
                <div className={styles.checkboxList}>
                  {allTeams2.map((team, index) => (
                    <div key={index} className={styles.checkboxItem}>
                      <input
                        className={styles.checkboxInput}
                        type="checkbox"
                        id={team}
                        value={team}
                        checked={selectedTeams.includes(team)}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={team} className={styles.checkboxText}>
                        {team}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {selectedTeams.length === 0 && (
                <span className={styles.error}>
                  Debe seleccionar al menos un Team.
                </span>
              )}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button
              type="submit"
              disabled={Object.keys(validationErrors).length > 0}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
