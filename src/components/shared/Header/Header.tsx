import { Avatar, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../Button";
import { Container } from "../Container";
import { NormalSearchField } from "../TextField";
import { Typography } from "../Typography";
import styles from "./styles.module.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RenderIf from "../RenderIf";
import { useEffect, useState } from "react";
import { Icons } from "constant";
import useTwitterFlow, { ITwitterUser } from "hooks/useTwitterFlow";
import useLocalStorageState from "use-local-storage-state";

export interface HeaderProps {
  openWalletModal?: any;
  onWalletBtnClickOpen?: any;
  onWalletBtnClickClose?: any;
  landingPageLocation?: any;
}

const Header = ({
  openWalletModal,
  onWalletBtnClickOpen,
  onWalletBtnClickClose,
  landingPageLocation,
}: HeaderProps) => {
  const location = useLocation();
  const homeLocation = location?.state?.icon === "home";
  const walletLocation = location?.state?.icon === "wallet";
  const mapsLocation = location?.state?.icon === "maps";
  const discoveryLocation = location?.state?.icon === "discovery";

  console.log("Header");
  const ConnectTwitter = () => {
    const { initateTwitterAuth, getTwitterUserInfo } = useTwitterFlow();
    const [twitterUserInfo, setTwitterUserInfo] = useLocalStorageState<{
      user?: ITwitterUser;
      isConnected: boolean;
    }>("twitterUserInfo");

    useEffect(() => {
      handleTwitterUserName();
    }, []);

    const handleTwitterUserName = async () => {
      if (twitterUserInfo) {
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
          console.log(user);
          setTwitterUserInfo({ user, isConnected: true });
          localStorage.removeItem("code");
          sessionStorage.removeItem("from");
        }
      } catch (e) {
        console.error(e);
        localStorage.removeItem("code");
        sessionStorage.removeItem("from");
      }
    };

    return (
      <>
        <RenderIf isTrue={twitterUserInfo?.isConnected as boolean}>
          <div className="flex" style={{ gap: "0.5rem", alignItems: "center" }}>
            <img src={Icons.twitterGreen} width={"20px"} height={"20px"} />
            <span style={{ fontSize: "1.6rem" }}>
              @{twitterUserInfo?.user?.username as string}
            </span>
          </div>
        </RenderIf>

        <RenderIf isTrue={!twitterUserInfo?.isConnected as boolean}>
          <Button
            gap="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            border="1px solid #1C223D"
            backgroundColor="transparent"
            boxShadow="none"
            borderRadius="100px"
            color="#000"
            fontWeight="700"
            size="1.6rem"
            hoverBackgroundColor="#fff"
            onClick={async () => {
              sessionStorage.setItem("from", "maps");
              const url = await initateTwitterAuth();
              window.open(url, "_self");
            }}
          >
            <img src={Icons.twitterBlack} width={"20px"} height={"20px"} />
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
            <Link
              to="/discovery"
              state={{
                icon: "discovery",
              }}
            >
              <span style={{ margin: "0 25px 0 15px" }}>
                <img
                  src="./assets/images/light_atlas.svg"
                  alt=""
                  width="80"
                  height="80"
                  style={{
                    backgroundColor: "transparent",
                  }}
                />
              </span>
            </Link>
          )}
        {walletLocation && (
          <Link
            to="/discovery"
            state={{
              icon: "discovery",
            }}
          >
            <span style={{ margin: "0 0 0 0px" }}>
              <img
                src="./assets/images/dark_atlas.svg"
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
            marginRight: "1.5rem",
            gap: "2rem",
          }}
        >
          <Link
            to="/maps"
            state={{
              icon: "maps",
            }}
            style={{ textDecoration: "none" }}
          >
            <Box onClick={onWalletBtnClickClose}>
              <Typography
                text="Allen.earth.eth"
                fontSize="1.6rem"
                color={walletLocation ? "#fff" : "#000"}
                cursor="pointer"
              />
            </Box>
          </Link>
          <ConnectTwitter />
        </div>
        {/* } */}
      </Box>
    </Container>
  );
};

export default Header;
