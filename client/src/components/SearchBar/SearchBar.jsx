import styles from "../SearchBar/SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {GetDriverByName} from "../../Redux/actions/actions";

const SearchBar = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState("");

    const [error, setError] = useState(false);


    const handleChange = (event) => {
      event.preventDefault();
        setName(event.target.value);
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(GetDriverByName(name))
        .then(() => {
          setError(false);
        })
        .catch((error) => {
          console.error(error);
          setError(true);
        });
      setName("");
    };

    useEffect(() => {
      let timer;
      if (error) {
        timer = setTimeout(() => {
          setError(false);
        }, 3000); // Tiempo en milisegundos antes de que desaparezca el mensaje de error
      }
      return () => {
        clearTimeout(timer);
      };
    }, [error]);

  return (
    <div>
         <input type='search' placeholder="Search Driver." onChange={ event => handleChange(event)} value={name}/>
         <button type="submit" onClick={event => handleSubmit(event)} className={styles.boton1}>Search</button>
         {error && <label className={styles.error}>No drivers with that name were found.</label>}
      </div>
  )
}

export default SearchBar;

