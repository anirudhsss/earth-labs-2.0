import "./App.css";

const App = () => {
  return (
    // <Web3ModalProvider>
    //   <div className="App"></div>
    // </Web3ModalProvider>
    <p>Hello</p>
  );
};

export default App;

// const [open, setOpen] = useState(false);
// const [loading, setLoading] = useState(false);

// const [forwarderOrigin, setForwarderOrigin] = useState(
//   "http://localhost:9010"
// );
// const [walletProvider, setWalletProvider] = useState<
//   "METAMASK" | "WALLETCONNECT"
// >("METAMASK");
// const [etherProviders, setEtherProvider] = useState<any>();
// const [claimProcess, setClaimProcess] = useState(
//   CLAIM_PROCESS.CONNECT_WALLET
// );
// const [isModalOpen, setModalOpen] = useState(false);
// const [userWalletAddress, setUserWalletAddress] = useState<any>("");
// const [chainId, setChainId] = useState<any>(1);
// const [signatureMessage, setSignatureMessage] = useState<any>("");
// const [sessionToken, setSessionToken] = useState<any>();
// const [isWalletConnected, setWalletConnected] = useState(false);
// const [data, setData] = useState<any>();

// useEffect(() => {
//   const info = async () => {
//     const res = await ApiRequest();
//     setData(res);
//   };
//   info();
// }, []);

// useEffect(() => {
//   const w: any = window;
//   if (w && w.ethereum) {
//     let provider = new ethers.providers.Web3Provider(w.ethereum);
//     setEtherProvider(provider);
//   }
// }, []);

// const onOpenConnectWalletModal = useCallback(() => {
//   setOpen(true);
// }, [open]);

// const onClose = () => {
//   setOpen(false);
// };

// const openModal = () => {
//   setModalOpen(true);
// };

// const closeModal = () => {
//   setModalOpen(false);
// };

// const setClaimProcessAndModel = (
//   isModalOpen: boolean,
//   claimProcess: string
// ) => {
//   setModalOpen(isModalOpen);
//   setClaimProcess(claimProcess);
// };

// const onConnectMetamask = async () => {
//   const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
//   if (!isMobileDevice) {
//     if (!_checkIfMetaMaskIsInstalled()) {
//       _onboardUserForMetaMask();
//       return;
//     }
//   }
//   onClose();
//   setWalletProvider("METAMASK");
//   const accountAddress = await etherProviders.send("eth_requestAccounts", []);
//   setClaimProcessAndModel(true, CLAIM_PROCESS.CONNECT_WALLET_LOADING);
//   const network = await etherProviders.getNetwork();
//   // await _getSignatureMessage(accountAddress[0]);
//   setUserWalletAddress(accountAddress[0]);
//   setChainId(network.chainId);
// };

// const renderDialogContainers = (claimProcess: string): any => {
//   switch (claimProcess) {
//     case CLAIM_PROCESS.CONNECT_WALLET_LOADING:
//       setLoading(true);
//   }
// };

// const _onboardUserForMetaMask = () => {
//   const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
//   onboarding.startOnboarding();
// };

// const _checkIfMetaMaskIsInstalled = (): boolean => {
//   const w: any = window;
//   return Boolean(w.ethereum && w.ethereum.isMetaMask);
// };

// const _getSignatureMessage = async (
//   accountAddress: string
// ): Promise<void> => {};

// const connectWalletConnectWallet = async () => {
//   onClose();
//   try {
//     const provider = new WalletConnectProvider({
//       infuraId: process.env.REACT_APP_INFURIA_ID, // Required
//       rpc: {
//         137: "https://rpc-mainnet.maticvigil.com/",
//       },
//     });
//     await provider.enable();
//     const walletConnectProvider = new providers.Web3Provider(provider);
//     const { accounts, chainId } = provider;
//     // await _getSignatureMessage(accounts[0]);
//     setUserWalletAddress(accounts[0]);
//     // Subscribe to accounts change
//     provider.on("accountsChanged", (accounts: string[]) => {});

//     // Subscribe to chainId change
//     provider.on("chainChanged", (chainId: number) => {});

//     // Subscribe to session connection
//     provider.on("connect", () => {});

//     // Subscribe to session disconnection
//     provider.on("disconnect", (code: number, reason: string) => {
//       logoutWallet();
//     });
//   } catch (error) {
//     console.error(error);
//   }
// };

// const logoutWallet = () => {
//   setChainId(null);
//   setSignatureMessage(null);
//   setUserWalletAddress(null);
//   setSessionToken(null);
//   setClaimProcessAndModel(false, CLAIM_PROCESS.CONNECT_WALLET);
//   setWalletConnected(false);
// };
