import { useEffect } from "react";

const useGetGlyphTxn = (txnId: string) => {
  useEffect(() => {
    getTxnDetails(txnId);
  }, [txnId]);

  const getTxnDetails = (txnId: string) => {
    
  };

  return {};
};

export default useGetGlyphTxn;
