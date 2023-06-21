import React from 'react';
import styles from './Banner.module.css';

const Banner = () => {
  return (
    <div className={styles.slider}>
      <div className={styles.slideTrack}>
        <div className={styles.slide}>
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686671270/Proyecto%20JS%20vanilla/Fernando-Alonso-Logo_tk99nj.png" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686671297/Proyecto%20JS%20vanilla/Max-Verstappen-Logo_yq7sv0.png" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686671314/Proyecto%20JS%20vanilla/Lewis-Hamilton-Logo_xbcfwk.png" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686671320/Proyecto%20JS%20vanilla/Mick-Schumacher-Logo_cdbtio.png" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686671333/Proyecto%20JS%20vanilla/Carlos-Sainz-Logo_znrue0.png" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686671342/Proyecto%20JS%20vanilla/Esteban-Ocon-Logo_gclutb.png" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686671355/Proyecto%20JS%20vanilla/Pierre-Gasly-Logo_cvmxg8.png" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686671366/Proyecto%20JS%20vanilla/Nikita-Mazepin-Logo_uwtahw.png" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686671378/Proyecto%20JS%20vanilla/Nicholas-Latifi-Logo_lq9kjr.png" alt="" />
        </div>
        <div className={styles.slide}>
          <img src="https://res.cloudinary.com/dg8awhbvm/image/upload/v1686671392/Proyecto%20JS%20vanilla/Lando-Norris-Logo_zndavp.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;