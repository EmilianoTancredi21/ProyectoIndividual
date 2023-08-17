// import style from "../Card/Card.module.css";
// import { Link } from "react-router-dom"

// const Card = ({ id, image, forename, surname, teams, dob }) => {
//   return (
//     <div className={style.container}>
//       <div className={`${style.card} ${style.card0}`}>
//         <div className={style.border}>
//           <img src={image} alt="" className={style.imageDriver} />
//           <div className={style.imageOverlay}>
//             <h1 className={style.name}>{forename} {surname}</h1>
//           </div>
//           <h3>
//             {dob}
//           </h3>
//             <h2 className={style.teams}>Teams: {teams}</h2>
//             <Link to={`/detail/${id}`}>
//               <button className={style.button}>More Info</button>
//             </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;


import style from "../Card/Card.module.css";
import { Link } from "react-router-dom"

const Card = ({ id, image, forename, surname, teams, dob }) => {
  return (
    <div className={style.container}>
      <div className={`${style.card} ${style.card0}`}>
        <div className={style.border}>
            <Link to={`/detail/${id}`}>
          <img src={image} alt="" className={style.imageDriver} />
            </Link>
          <div className={style.imageOverlay}>
            <h1 className={style.name}>{forename} {surname}</h1>
          </div>
          <h3>
            {dob}
          </h3>
            <h2 className={style.teams}>Teams: {teams}</h2>
        </div>
      </div>
    </div>
  );
};

export default Card;