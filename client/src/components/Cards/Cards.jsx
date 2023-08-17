import style from "../Cards/Cards.module.css";
import Card from "../Card/Card";

const Cards = ({ drivers }) => {
  return (
    <div className={style.cards}>
      {drivers.map((driver) => (
        <Card
          key={driver.id}
          id={driver.id}
          image={driver.image}
          dob={driver.dob}
          forename={driver.forename}
          surname={driver.surname}
          teams={driver.teams ? driver.teams : driver.Teams?.map((team) => team.name).join(', ')}
        />
      ))}
    </div>
  );
};

export default Cards;


