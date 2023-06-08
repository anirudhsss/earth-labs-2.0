import { Icons } from "constant";
import useTwitterFlow, { ITwitterUser } from "hooks/useTwitterFlow";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { Button } from "../Button";
import ConnectWallet from "../ConnectWallet";
import { Container } from "../Container";
import RenderIf from "../RenderIf";
import TwitterContext from "context/twitter.context";
import { NormalSearchField } from "../TextField";
import { Typography } from "../Typography";
import TxnSearch from "context/transactionsearch.context";
import useSearchTxnAddress from "hooks/useSearchTxnAddress";

interface IOnboardingHeader {
  isAtlasLogo?: boolean;
  isConnectWallet?: boolean;
  altTxnHash?: string;
  isSearch: boolean;
  onSearchHandle?: any;
}

const OnboardingHeader: FC<IOnboardingHeader> = ({
  isAtlasLogo,
  isConnectWallet = true,
  altTxnHash,
  isSearch,
  onSearchHandle,
}) => {
  const location = useLocation();
  const { searchTxnAddress } = useSearchTxnAddress();
  const homeLocation = location?.pathname === "/home";
  const walletLocation = location?.pathname === "/wallet";
  const mapsLocation = location?.pathname === "/maps";
  const discoveryLocation = location?.pathname === "/discovery";
  const { initateTwitterAuth, getTwitterUserInfo } = useTwitterFlow();
  const { updateTwitterUser, twitterUser } = useContext(TwitterContext);
  const [twitterUserInfo, setTwitterUserInfo] = useLocalStorageState<{
    user?: ITwitterUser;
    isConnected: boolean;
  }>("twitterUserInfo");
  const [searchTxt, setSearchTxt] = useState<string>();
  const handleTwitterUserName = useCallback(async () => {
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
  }, [getTwitterUserInfo, setTwitterUserInfo, twitterUserInfo]);

  useEffect(() => {
    handleTwitterUserName();
  }, [handleTwitterUserName]);
  const navigate = useNavigate();
  const Item = ({ text }: { text: string }) => {
    return (
      <li
        style={{
          fontSize: "1.6rem",
          color: "#fff",
        }}
      >
        {text}
      </li>
    );
  };

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
              const path = location.pathname;
              if (path.includes("txn")) {
                sessionStorage.setItem("from", "txn");
                const url = await initateTwitterAuth();
                window.open(url, "_self");
              } else {
                sessionStorage.setItem("from", "landing");
                const url = await initateTwitterAuth();
                window.open(url, "_self");
              }
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
    <Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
          height: "6.8rem",
          borderBottom: "1px solid #fff",
        }}
      >
        <div
          className="flex"
          style={{
            alignItems: "center",
            gap: "3rem",
          }}
        >
          <RenderIf isTrue={Boolean(isAtlasLogo)}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                style={{
                  cursor: "pointer",
                  height: "64px",
                  width: "120px",
                }}
                src={Icons.atlasDark}
                alt=""
                onClick={() => {
                  navigate("/maps");
                }}
              />
            </Link>
          </RenderIf>
          <RenderIf isTrue={!Boolean(isAtlasLogo)}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                style={{
                  cursor: "pointer",
                }}
                src={Icons.glphyLogo}
                alt=""
              />
            </Link>
          </RenderIf>
          <RenderIf isTrue={isSearch}>
            <div
              className="flex"
              style={{ gap: "0.5rem", alignItems: "center" }}
            >
              <NormalSearchField
                borderColor="#fff"
                padding={"1rem"}
                placeholderColor={"#fff"}
                placeholderFontSize={"1.6rem"}
                fontSize={"1.6rem"}
                searchIconColor={"#fff"}
                iconSize={"2rem"}
                onChange={(value: string) => {
                  if (value.length > 0) {
                    setSearchTxt(value);
                  }
                }}
              />
              <Button
                backgroundColor="#FE7D06"
                color="white"
                border="0.5px solid rgba(46, 52, 81, 0.58)"
                hoverBackgroundColor="#FE7D06"
                borderRadius="2rem"
                padding="0.2rem 2.5rem"
                margin="0 0 0 1rem"
                onClick={() => {
                  searchTxnAddress(searchTxt as string);
                  onSearchHandle(searchTxt);
                }}
              >
                <Typography text="Search" fontSize="1.4rem" />
              </Button>
            </div>
          </RenderIf>
        </div>
        <div className="flex">
          <ul
            style={{
              gap: "2rem",
              listStyle: "none",
            }}
            className="flex flex-row align-items-center"
          >
            <Item text={"About Us"} />
            <ConnectTwitter />
            <RenderIf isTrue={isConnectWallet}>
              <li>
                <ConnectWallet altTxnHash={altTxnHash} />
              </li>
            </RenderIf>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default OnboardingHeader;
