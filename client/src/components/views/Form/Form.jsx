import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styles from "../Form/Form.module.css";
import { GetAllTeams } from "../../../Redux/actions/actions";
import toast from "react-hot-toast";
import { countries } from "../../../countries";

const FormPage = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const allTeams = new Set(teams.flat());
  const allTeams2 = [...allTeams];

  const [selectedTeams, setSelectedTeams] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // const URL = "http://localhost:3001";
  const URL = "https://drivers-zmnv.onrender.com";

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

  const validateURL = (url) => {
    const pattern = new RegExp(
      "^(https?:\\/\\/)" + // protocolo (requiere http o https)
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})" + // dominio
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // ruta
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // cadena de consulta
        "(\\#[-a-z\\d_]*)?$",
      "i" // fragmento
    );
    const imagePattern = /\.(jpeg|jpg|gif|png|webp|bmp)$/i;
    return !!pattern.test(url) && !!imagePattern.test(url);
  };

  const validateField = (fieldName) => {
    let error = "";
    const value = driver[fieldName].trim();

    if (value === "") {
      error = `The field ${fieldName} is required.`;
    } else if (fieldName === "forename" || fieldName === "surname") {
      const containsNumbers = /\d/.test(value);
      if (containsNumbers) {
        error = `The field ${fieldName} cannot contain numbers.`;
      }
    } else if (fieldName === "description") {
      if (value.length < 15) {
        error = "The description must be at least 15 characters.";
      }
    } else if (fieldName === "image") {
      if (!validateURL(value)) {
        error =
          "The image URL is not valid. It must be a valid URL ending with .jpeg, .jpg, .gif, .png, .webp, or .bmp";
      }
    } else if (fieldName === "dob") {
      const today = new Date();
      const dobDate = new Date(value);
      const minDate = new Date("1900-01-01");
      const age = today.getFullYear() - dobDate.getFullYear();
      const ageDiffMonth = today.getMonth() - dobDate.getMonth();
      const ageDiffDay = today.getDate() - dobDate.getDate();

      if (dobDate > today) {
        error = "The date of birth cannot be in the future.";
      } else if (dobDate < minDate) {
        error = "The date of birth cannot be earlier than January 1, 1900.";
      } else if (
        age < 18 ||
        (age === 18 &&
          (ageDiffMonth < 0 || (ageDiffMonth === 0 && ageDiffDay < 0)))
      ) {
        error = "The driver must be at least 18 years old.";
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
    setFormSubmitted(true);
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

      setSelectedTeams([]);

      // alert("Elemento creado correctamente");
      toast.success("Correctly registered driver");
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

      setFormSubmitted(false);
    } catch (error) {
      if (error.response.data.error === "The driver already exists") {
        toast.error(
          "Error: The driver with the first and last name entered already exists in the database"
        );
      } else {
        console.error("Error al crear el elemento", error.response.data);
        setError("Error al crear el elemento");
        toast.error("An error occurred while registering the driver");
      }
    }
  };

  const getMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0];
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.formImage}></div>
        <div className={styles.formContent}>
          <div className={styles.driverForm}>
            <h1 className={styles.titleForm}>REGISTER A NEW DRIVER!</h1>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.formField}>
                <label htmlFor="forename">Forename:</label>
                <input
                  type="text"
                  id="forename"
                  name="forename"
                  value={driver.forename}
                  placeholder="Driver name..."
                  onChange={(e) =>
                    handleFieldChange("forename", e.target.value)
                  }
                />
                <div className={styles.errorContainer}>
                  {formSubmitted && validationErrors.forename && (
                    <span className={styles.error}>
                      {validationErrors.forename}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.formField}>
                <label htmlFor="surname">Surname:</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={driver.surname}
                  placeholder="Driver surname..."
                  onChange={(e) => handleFieldChange("surname", e.target.value)}
                />
                <div className={styles.errorContainer}>
                  {formSubmitted && validationErrors.surname && (
                    <span className={styles.error}>
                      {validationErrors.surname}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formField}>
                <label htmlFor="nationality">Nationality:</label>
                <select
                  id="nationality"
                  className={styles.selected}
                  name="nationality"
                  value={driver.nationality}
                  onChange={(e) =>
                    handleFieldChange("nationality", e.target.value)
                  }
                >
                  <option value="">Select a nationality...</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <div className={styles.errorContainer}>
                  {formSubmitted && validationErrors.nationality && (
                    <span className={styles.error}>
                      {validationErrors.nationality}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formField}>
                <label htmlFor="image">Image:</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={driver.image}
                  placeholder="Url image..."
                  onChange={(e) => handleFieldChange("image", e.target.value)}
                />

                <div className={styles.errorContainer}>
                  {formSubmitted && validationErrors.image && (
                    <span className={styles.error}>
                      {validationErrors.image}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.formField}>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={driver.dob}
                  max={getMaxDate()}
                  onChange={(e) => handleFieldChange("dob", e.target.value)}
                />
                <div className={styles.errorContainer}>
                  {formSubmitted && validationErrors.dob && (
                    <span className={styles.error}>{validationErrors.dob}</span>
                  )}
                </div>
              </div>
              <div className={styles.formField}>
                <label htmlFor="description">Description:</label>
                <textarea
                  value={driver.description}
                  placeholder="Driver description..."
                  onChange={(e) =>
                    handleFieldChange("description", e.target.value)
                  }
                ></textarea>
                <div className={styles.errorContainer}>
                  {formSubmitted && validationErrors.description && (
                    <span className={styles.error}>
                      {validationErrors.description}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.formField}>
                <label htmlFor="teams" className={styles.checkboxLabel}>
                  Teams:
                </label>
              </div>
              <div className={styles.checkboxContainer}>
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
              <div className={styles.errorContainer}>
                {formSubmitted && selectedTeams.length === 0 && (
                  <span className={styles.error}>
                    You must select at least one team.
                  </span>
                )}
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <div>
                <button
                  id="create"
                  className={styles.create}
                  type="submit"
                  // disabled={Object.keys(validationErrors).length > 0}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
