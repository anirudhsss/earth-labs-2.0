import { useNavigate } from "react-router-dom";

const useNavigateMaps = () => {
  const Navigate = useNavigate();

  const navigateToMaps = () => {
    Navigate("/maps");
  };

  return { navigateToMaps };
};

export default useNavigateMaps;
