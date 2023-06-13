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
      <img
        style={{
          cursor: "pointer",
          width: "20px",
          height: "20px",
        }}
        src={Icons.copy}
        alt=""
        onClick={async () => {
          await navigator.clipboard.writeText(text);
        }}
      />
    </div>
  );
};

export default CopyContainer;
