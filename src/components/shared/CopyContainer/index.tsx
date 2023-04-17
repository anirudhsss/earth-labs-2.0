import { Icons } from "constant";
import { FC } from "react";
import styles from "./styles.module.css";

interface ICopyContainer {
  text: string;
}

const CopyContainer: FC<ICopyContainer> = ({ text }) => {
  return (
    <div className={styles.copy_container}>
      <span className={styles.copy_container_text}>{text}</span>
      <img src={Icons.copy} />
    </div>
  );
};

export default CopyContainer;
