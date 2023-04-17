import { style } from "@mui/system";
import { FC } from "react";
import styles from "./style.module.css";

interface IInfoField {
  text: string;
  label: string;
}

const InfoField: FC<IInfoField> = ({ text, label }) => {
  return (
    <div className={styles.info_field_wrapper}>
      <label className={styles.info_field_label}>{label}</label>
      <div className={styles.info_field_input}>
        <div className={styles.info_field_divider}></div>
        <div className={styles.info_field_text}>{text}</div>
      </div>
    </div>
  );
};

export default InfoField;
