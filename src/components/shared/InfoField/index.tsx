import { FC } from "react";
import styles from "./style.module.css";

interface IInfoField {
  text: string;
  label: string;
  content?: JSX.Element;
}

const InfoField: FC<IInfoField> = ({ text, label, content }) => {
  return (
    <div className={styles.info_field_wrapper}>
      <label className={styles.info_field_label}>{label}</label>
      <div className={styles.info_field_input}>
        <div className={styles.info_field_divider}></div>
        <div className={styles.info_field_text}>{content ? content : text}</div>
      </div>
    </div>
  );
};

export default InfoField;
