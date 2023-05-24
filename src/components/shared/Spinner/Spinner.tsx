import { CSSProperties, FC, useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface ISpinner {
  isLoading: boolean;
}
const Spinner: FC<ISpinner> = ({ isLoading }) => {
  let [color, setColor] = useState("#ffffff");
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (
    <BeatLoader
      color={color}
      loading={isLoading}
      cssOverride={override}
      size={10}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
