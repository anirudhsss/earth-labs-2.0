import { useLocation, useNavigate } from "react-router-dom";

const useSearchTxnAddress = () => {
  const Navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const searchTxnAddress = (searchText: string) => {
    if (
      searchText.length !== 0 &&
      searchText.length == 66 &&
      searchText.substring(0, 2) == "0x"
    ) {
      if (pathName.includes("txn")) {
        return;
      }
      Navigate(`/txn/${searchText}`);
    }
    if (
      searchText.length !== 0 &&
      searchText.length > 40 &&
      searchText.length < 44 &&
      searchText.substring(0, 2) == "0x"
    ) {
      if (pathName.includes("maps")) {
        return;
      }
      Navigate(`/maps/${searchText}`);
    }
  };

  return { searchTxnAddress };
};

export default useSearchTxnAddress;
