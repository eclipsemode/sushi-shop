import React from "react";
import styles from './Banner.module.css';
import BannerImg from 'app/assets/img/banner.png';

const Banner: React.FC = React.memo(() => {
  return (
    <div className={styles.root}>
        <div className={styles.root__info}>
          <span>Double Cheese</span>
          <span>BURGER</span>
          <span>With Free Cocacola. Stay home , we deliver</span>
        </div>
      <img alt='banner' src={BannerImg} />
    </div>
  );
});

export default Banner;