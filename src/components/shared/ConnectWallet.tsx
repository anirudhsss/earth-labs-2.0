import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLocation } from "react-router-dom";

const ConnectWallet = () => {
  const location = useLocation();
  const homeLocation = location?.pathname === "/home";
  const walletLocation = location?.pathname === "/wallet";
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
          padding: '0rem 3rem',
          fontFamily: 'DINAlternateBold',
        },
        "& .connect_wallet_button [data-testid='rk-connect-button']": {
          border: (homeLocation || mapsLocation || discoveryLocation) ? '1px solid #1C223D' : '1px solid #fffdfb',
          color: (homeLocation || mapsLocation || discoveryLocation) ? '#000' : '#fffdfb',
          borderRadius: '20px',
          // backgroundColor: (homeLocation || mapsLocation || discoveryLocation) ? '#fffdfb' : '#1b223d',
          backgroundColor: 'transparent',
          fontSize: '1.6rem',
          padding: '0rem 3rem',
          fontFamily: 'DINAlternateBold',
        },
      }}
    >
      <ConnectButton />
    </Box>)
};

export default ConnectWallet;

{
  /* <Button
                  color="#1C223D"
                  padding="0rem 4rem"
                  height={"40px"}
                  backgroundColor="#fff"
                  borderRadius="200px"
                  onClick={openConnectModal}
                >
                  <span
                    style={{
                      fontSize: "1.6rem",
                    }}
                  >
                    Connect Wallet
                  </span>
                </Button> */
}
