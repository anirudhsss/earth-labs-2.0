import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLocation } from "react-router-dom";

const ConnectWallet = () => {
  const location = useLocation();
  const homeLocation = location?.pathname === "/home";
  const mapsLocation = location?.pathname === "/maps";
  const discoveryLocation = location?.pathname === "/discovery";
  return (
    <Box
      className="connectWalletWrapper"
      sx={{
        "&:hover": {
          backgroundColor: (homeLocation || mapsLocation || discoveryLocation) ? 'white' : '#1b223d',
        },
        "& [data-testid='rk-connect-button']": {
          border: (homeLocation || mapsLocation || discoveryLocation) ? '1px solid #1C223D' : '1px solid #fffdfb',
          color: (homeLocation || mapsLocation || discoveryLocation) ? '#000' : '#fffdfb',
          borderRadius: '20px',
          // backgroundColor: (homeLocation || mapsLocation || discoveryLocation) ? '#fffdfb' : '#1b223d',
          backgroundColor: 'transparent',
          fontSize: '1.6rem',
          padding: '0rem 4rem',
          fontFamily: 'DINAlternateBold',
          boxShadow:"none !important"
        },
        "& .connect_wallet_button [data-testid='rk-connect-button']": {
          border: (homeLocation || mapsLocation || discoveryLocation) ? '1px solid #1C223D' : '1px solid #fffdfb',
          color: (homeLocation || mapsLocation || discoveryLocation) ? '#000' : '#fffdfb',
          borderRadius: '20px',
          // backgroundColor: (homeLocation || mapsLocation || discoveryLocation) ? '#fffdfb' : '#1b223d',
          backgroundColor: 'transparent',
          fontSize: '1.6rem',
          padding: '0rem 4rem',
          fontFamily: 'DINAlternateBold',
          boxShadow:"none !important"
        },
      }}
    >
      <ConnectButton />
    </Box>)
};

export default ConnectWallet;
