import { About } from "../About/About";
import { Delivery } from "../Delivery/Delivery";
import { Gifts } from "../Gifts/Gifts";
import { Promo } from "../Promo/Promo";
import { Tastes } from "../Tastes/Tastes";

import styles from "./Main.module.css";

const MainPage = () => {
  return (
    <main className={styles.wrapper}>
      <h1 className="visually-hidden">Магазин мороженого Глейси.</h1>
      <Promo />
      <Gifts />
      <Tastes />
      <About />
      <Delivery />
    </main>
  );
};

export { MainPage };
