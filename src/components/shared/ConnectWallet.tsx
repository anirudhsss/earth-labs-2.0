import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLocation } from "react-router-dom";

export interface ConnectWallretProps {
  altTxnHash?: string;
}

const ConnectWallet = ({ altTxnHash }: ConnectWallretProps) => {
  const location = useLocation();
  const homeLocation = location?.pathname === "/home";
  const mapsLocation = location?.pathname === "/maps";
  const discoveryLocation = location?.pathname === "/discovery";
  return (
    <Box
      className="connectWalletWrapper"
      sx={{
        "&:hover": {
          backgroundColor:
            homeLocation || mapsLocation || discoveryLocation || altTxnHash
              ? "white"
              : "#1b223d",
        },
        "& [data-testid='rk-connect-button']": {
          border:
            homeLocation || mapsLocation || discoveryLocation || altTxnHash
              ? "1px solid #1C223D"
              : "1px solid #fffdfb",
          color:
            homeLocation || mapsLocation || discoveryLocation || altTxnHash
              ? "#000"
              : "#fffdfb",
          borderRadius: "20px",
          // backgroundColor: (homeLocation || mapsLocation || discoveryLocation || altTxnHash) ? '#fffdfb' : '#1b223d',
          backgroundColor: "transparent",
          fontSize: "1.6rem",
          padding: "0rem 4rem",
          fontFamily: "DINAlternateBold",
          boxShadow: "none !important",
        },
        "& .connect_wallet_button [data-testid='rk-connect-button']": {
          border:
            homeLocation || mapsLocation || discoveryLocation || altTxnHash
              ? "1px solid #1C223D"
              : "1px solid #fffdfb",
          color:
            homeLocation || mapsLocation || discoveryLocation || altTxnHash
              ? "#000"
              : "#fffdfb",
          borderRadius: "20px",
          // backgroundColor: (homeLocation || mapsLocation || discoveryLocation || altTxnHash) ? '#fffdfb' : '#1b223d',
          backgroundColor: "transparent",
          fontSize: "1.6rem",
          padding: "0rem 4rem",
          fontFamily: "DINAlternateBold",
          boxShadow: "none !important",
        },
      }}
    >
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "18px",
          }}
        >
          <svg
            style={{ height: "20px", width: "20px" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ffffff"
            className="w-6 h-6"
          >
            <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
          </svg>
        </div>
        <ConnectButton></ConnectButton>
      </div>
    </Box>
  );
};

export default ConnectWallet;
