import { FC } from "react";
import styles from "./style.module.css";

interface IInfoField {
  text: string;
  label: string;
  content?: JSX.Element;
  hideTransparency?: boolean;
}

const InfoField: FC<IInfoField> = ({ text, label, content, hideTransparency }) => {
  return (
    <div className={styles.info_field_wrapper}>
      <label className={styles.info_field_label}>{label}</label>
      <div
        className={styles.info_field_input}
        style={{ backgroundColor: hideTransparency ? '#707380' : 'rgba(255, 253, 251, 0.31)' }}
      >
        <div className={styles.info_field_divider}></div>
        <div className={styles.info_field_text}>{content ? content : text}</div>
      </div>
    </div>
  );
};

export default InfoField;
