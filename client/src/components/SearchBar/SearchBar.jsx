import styles from "../SearchBar/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { GetDriverByName, getAllDrivers } from "../../Redux/actions/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [localName, setLocalName] = useState(""); // Estado local para el input
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localName === "") {
      // Si el input está vacío, cargar todos los drivers
      dispatch(getAllDrivers());
    }
  }, [localName, dispatch]);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setLocalName(inputValue); // Actualizar el estado local del input
    if (inputValue) {
      dispatch(GetDriverByName(inputValue))
        .then(() => setError(false))
        .catch((error) => {
          console.error(error);
          setError(true);
        });
    } else {
      setError(false);
    }
  };

  return (
    <div className={styles.search__box}>
      <input
        type="text"
        placeholder="Ej: Lewis Hamilton."
        onChange={handleChange}
        value={localName}
        className={styles.search__input}
      />
      <svg
        className="w-4 h-4 ml-2 text-gray-500 absolute right-2 top-2.5 mt-1 mr-1 "
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
