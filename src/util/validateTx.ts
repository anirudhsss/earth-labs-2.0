const isValidTxnHash = (txn: string): { message: string; isValid: boolean } => {
  const regexPattern = new RegExp(/^0x([A-Fa-f0-9]{64})$/);

  if (!txn) {
    return {
      isValid: false,
      message: "Please enter a txnhash",
    };
  }

  if (!regexPattern.test(txn)) {
    return {
      isValid: false,
      message: "Please enter a valid txnhash",
    };
  }
  return {
    isValid: true,
    message: "",
  };
};

export default isValidTxnHash;
