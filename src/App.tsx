import { useCallback, useEffect, useState } from 'react';
import { ConnectWalletModal } from './components/shared/ConnectWalletModal'
import { UserHomepage } from './components/shared/UserHomepage'
import { ethers } from "ethers";
import Web3Modal from 'web3modal';
import LoadingSpin from "react-loading-spin";

import './App.css';

const providerOptions = {

}

const App = () => {
  const [open, setOpen] = useState(false);
  const [web3Provider, setWeb3Provider] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const onOpenConnectWalletModal = useCallback(() => {
    setOpen(true);
  }, [open]);

  const onClose = () => {
    setOpen(false);
  }

  const onConnectMetamask = async () => {
    onClose();
    try {
      let web3Modal = new Web3Modal({
        cacheProvider: false,
        providerOptions,
      });
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
      setLoading(true);
      if (web3ModalProvider) {
        setLoading(false);
        setWeb3Provider(web3ModalProvider);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="App">
      <UserHomepage
        onOpenConnectWalletModal={onOpenConnectWalletModal}
        web3Provider={web3Provider}
        setWeb3Provider={setWeb3Provider}
        loading={loading}
      >
        <ConnectWalletModal
          open={open}
          onClose={onClose}
          onConnectMetamask={onConnectMetamask}
        />
      </UserHomepage>
    </div>
  );
}

export default App;
