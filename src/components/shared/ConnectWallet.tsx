import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useLocation } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
export interface ConnectWallretProps {
  altTxnHash?: string;
}

const ConnectWallet = ({ altTxnHash }: ConnectWallretProps) => {
  const location = useLocation();
  const homeLocation = location?.pathname.includes("/home");
  const mapsLocation = location?.pathname.includes("/maps");
  const discoveryLocation = location?.pathname.includes("/discovery");

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className={
                      mapsLocation || discoveryLocation
                        ? "connect_wallet_button_black"
                        : "connect_wallet_button_white"
                    }
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: "DINAlternateBold",
                    }}
                    onClick={openConnectModal}
                    type="button"
                  >
                    <FaWallet
                      size={18}
                      color={mapsLocation ? "#000000" : "#ffffff"}
                    />
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  {/* <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}

                  <button
                    style={{
                      border: "1px solid #000",
                      background: "transparent",
                      padding: "0 20px",
                      height: "4rem",
                      borderRadius: "20px",
                      cursor: "pointer",
                    }}
                    onClick={openAccountModal}
                    type="button"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectWallet;
