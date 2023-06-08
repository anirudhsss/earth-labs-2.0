import { Box, Icon } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Icons } from "constant";
import TwitterContext from "context/twitter.context";
import useSearchTxnAddress from "hooks/useSearchTxnAddress";
import useTwitterFlow, { ITwitterUser } from "hooks/useTwitterFlow";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { Button } from "../Button";
import { Container } from "../Container";
import RenderIf from "../RenderIf";
import { NormalSearchField } from "../TextField";
import { Typography } from "../Typography";
import styles from "./styles.module.css";

export interface HeaderProps {
  openWalletModal?: any;
  onWalletBtnClickOpen?: any;
  onWalletBtnClickClose?: any;
  landingPageLocation?: any;
  onSearchTxn: any;
}

const Header = ({
  openWalletModal,
  onWalletBtnClickOpen,
  onWalletBtnClickClose,
  landingPageLocation,
  onSearchTxn,
}: HeaderProps) => {
  const location = useLocation();
  const homeLocation = location?.pathname.includes("/home");
  const walletLocation = location?.pathname.includes("/wallet");
  const mapsLocation = location?.pathname.includes("/maps");
  const discoveryLocation = location?.pathname.includes("/discovery");
  const { updateTwitterUser, twitterUser } = useContext(TwitterContext);
  const [svgColor, setSvgColor] = useState<string>();
  const { searchTxnAddress } = useSearchTxnAddress();
  const [txn, setTxn] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    if (walletLocation) {
      setSvgColor("#ffffff");
      return;
    }
    setSvgColor("#000000");
  }, [walletLocation]);

  // console.log("Header");
  const ConnectTwitter = () => {
    const { initateTwitterAuth, getTwitterUserInfo } = useTwitterFlow();

    const handleTwitterUserName = useCallback(async () => {
      if (twitterUser) {
        return;
      }
      try {
        const code = localStorage.getItem("code");
        if (code) {
          const user = await getTwitterUserInfo(
            "state",
            code as string,
            window.location.origin
          );
          if (updateTwitterUser) updateTwitterUser(user);
          localStorage.removeItem("code");
          sessionStorage.removeItem("from");
        }
      } catch (e) {
        console.error(e);
        localStorage.removeItem("code");
        sessionStorage.removeItem("from");
      }
    }, [getTwitterUserInfo]);

    useEffect(() => {
      handleTwitterUserName();
    }, [twitterUser]);

    return (
      <>
        <RenderIf isTrue={Boolean(twitterUser)}>
          <div
            className="flex"
            style={{ gap: "0.5rem", alignItems: "center", cursor: "pointer" }}
            onClick={() => {
              if (updateTwitterUser) updateTwitterUser(undefined);
            }}
          >
            <img
              src={Icons.twitterGreen}
              alt=""
              width={"20px"}
              height={"20px"}
            />
            <span
              style={{
                fontSize: "1.6rem",
                color:
                  homeLocation || mapsLocation || discoveryLocation
                    ? "#000"
                    : "#fffdfb",
              }}
            >
              @{twitterUser?.username as string}
            </span>
          </div>
        </RenderIf>

        <RenderIf isTrue={!Boolean(twitterUser)}>
          <Button
            gap="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border={`1px solid ${
              homeLocation || mapsLocation || discoveryLocation
                ? "#1C223D"
                : "#fffdfb"
            }`}
            backgroundColor="transparent"
            boxShadow="none"
            borderRadius="100px"
            color={`${
              homeLocation || mapsLocation || discoveryLocation
                ? "#000"
                : "#fffdfb"
            }`}
            fontWeight="700"
            size="1.6rem"
            hoverBackgroundColor="transparent"
            onClick={async () => {
              sessionStorage.setItem("from", "maps");
              const url = await initateTwitterAuth();
              window.open(url, "_self");
            }}
            padding="5px 20px"
          >
            <img
              src={
                homeLocation || mapsLocation || discoveryLocation
                  ? Icons.twitterBlack
                  : Icons.twitterWhite
              }
              alt=""
              width={"20px"}
              height={"20px"}
            />
            Connect Twitter
          </Button>
        </RenderIf>
      </>
    );
  };

  return (
    <Container
      padding="0.5rem 2rem 0.5rem 0"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      borderBottom={`0.5px solid ${
        mapsLocation || homeLocation || discoveryLocation
          ? "rgba(0, 0, 0, 0.6)"
          : "#FFFDFB"
      }`}
      height="7.6vh"
    >
      <Box
        className={styles.lhsHeader}
        sx={{
          padding: openWalletModal && "5px 0",
        }}
      >
        {(mapsLocation || homeLocation || discoveryLocation) &&
          !openWalletModal && (
            <span
              style={{ margin: "0 25px 0 15px" }}
              onClick={() => {
                navigate("/maps");
              }}
            >
              <img
                src={Icons.glyphWhiteLogo}
                alt=""
                width="80"
                height="80"
                style={{
                  backgroundColor: "transparent",
                }}
              />
            </span>
          )}
        {walletLocation && (
          <Link
            to="/"
            // state={{
            //   icon: "discovery",
            // }}
          >
            <span style={{ margin: "0 0 0 0px" }}>
              <img
                src={Icons.darkAtlas}
                alt=""
                width="120"
                height="120"
                style={
                  {
                    // backgroundColor: '#1C223D',
                  }
                }
              />
            </span>
          </Link>
        )}
        {(mapsLocation ||
          homeLocation ||
          discoveryLocation ||
          walletLocation ||
          landingPageLocation) &&
          !openWalletModal && (
            <NormalSearchField
              onChange={(e) => {
                setTxn(e);
              }}
              placeholderColor={`${
                mapsLocation ||
                homeLocation ||
                discoveryLocation ||
                landingPageLocation
                  ? "rgba(0, 0, 0, 0.6)"
                  : "#FFFDFB"
              }`}
              borderColor={`${
                mapsLocation ||
                homeLocation ||
                discoveryLocation ||
                landingPageLocation
                  ? "rgba(0, 0, 0, 0.6)"
                  : "#FFFDFB"
              }`}
              searchIconColor={`${
                mapsLocation ||
                homeLocation ||
                discoveryLocation ||
                landingPageLocation
                  ? "rgba(0, 0, 0, 0.6)"
                  : "#FFFDFB"
              }`}
            />
          )}
        {(mapsLocation ||
          homeLocation ||
          discoveryLocation ||
          walletLocation ||
          landingPageLocation) &&
          !openWalletModal && (
            <Button
              backgroundColor="#FE7D06"
              color="white"
              border="0.5px solid rgba(46, 52, 81, 0.58)"
              hoverBackgroundColor="#FE7D06"
              borderRadius="2rem"
              padding="0.2rem 2.5rem"
              margin="0 0 0 1rem"
              onClick={() => {
                searchTxnAddress(txn);
                onSearchTxn(txn);
              }}
            >
              <Typography
                //text={userWalletAddress === null ? 'Search' : 'Search'}
                text="Search"
                fontSize="1.4rem"
              />
            </Button>
          )}
      </Box>
      <Box>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // marginRight: "1.5rem",
            gap: "2rem",
          }}
        >
          {/* <Link
                        to="/maps"
                        style={{ textDecoration: "none" }}
                    >
                        <Box onClick={onWalletBtnClickClose}>
                            {condition && <Typography
                                text={`${data?.dotEarthHandle}.earth.eth`}
                                fontSize="1.6rem"
                                color={walletLocation ? "#fff" : "#000"}
                                cursor="pointer"
                            />}
                        </Box>
                    </Link> */}
          <ConnectTwitter />
          <Box
            // className="connect_wallet_button"
            sx={{
              // border: (homeLocation || mapsLocation || discoveryLocation) ? '1px solid #1C223D' : '1px solid #fffdfb',
              // color: (homeLocation || mapsLocation || discoveryLocation) ? '#000' : '#fffdfb',
              // borderRadius: '20px',
              // backgroundColor: (homeLocation || mapsLocation || discoveryLocation) ? 'white' : '#1b223d',
              "&:hover": {
                backgroundColor:
                  homeLocation || mapsLocation || discoveryLocation
                    ? "white"
                    : "#1b223d",
              },
              "& [data-testid='rk-connect-button']": {
                border:
                  homeLocation || mapsLocation || discoveryLocation
                    ? "1px solid #1C223D"
                    : "1px solid #fffdfb",
                color:
                  homeLocation || mapsLocation || discoveryLocation
                    ? "#000"
                    : "#fffdfb",
                borderRadius: "20px",
                // backgroundColor: (homeLocation || mapsLocation || discoveryLocation) ? '#fffdfb' : '#1b223d',
                backgroundColor: "transparent",
                fontSize: "1.6rem",
                padding: "0rem 4rem",
                fontFamily: "DINAlternateBold",
                boxShadow: "none !important",
              },
              "& .connect_wallet_button [data-testid='rk-connect-button']": {
                border:
                  homeLocation || mapsLocation || discoveryLocation
                    ? "1px solid #1C223D"
                    : "1px solid #fffdfb",
                color:
                  homeLocation || mapsLocation || discoveryLocation
                    ? "#000"
                    : "#fffdfb",
                borderRadius: "20px",
                // backgroundColor: (homeLocation || mapsLocation || discoveryLocation) ? '#fffdfb' : '#1b223d',
                backgroundColor: "transparent",
                fontSize: "1.6rem",
                padding: "0rem 4rem",
                fontFamily: "DINAlternateBold",
                boxShadow: "none !important",
              },
              "& .connectWalletWrapper > button": {
                border:
                  homeLocation || mapsLocation || discoveryLocation
                    ? "1px solid #1C223D"
                    : "1px solid #fffdfb",
                color:
                  homeLocation || mapsLocation || discoveryLocation
                    ? "#000"
                    : "#fffdfb",
                borderRadius: "20px",
                // backgroundColor: (homeLocation || mapsLocation || discoveryLocation) ? '#fffdfb' : '#1b223d',
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
                  fill={svgColor}
                  className="w-6 h-6"
                >
                  <path d="M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z" />
                </svg>
              </div>
              <ConnectButton></ConnectButton>
            </div>
          </Box>
        </div>
        {/* } */}
      </Box>
    </Container>
  );
};

export default Header;
