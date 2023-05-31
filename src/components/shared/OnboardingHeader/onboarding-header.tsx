import { Icons } from "constant";
import useTwitterFlow, { ITwitterUser } from "hooks/useTwitterFlow";
import { FC, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { Button } from "../Button";
import ConnectWallet from "../ConnectWallet";
import { Container } from "../Container";
import RenderIf from "../RenderIf";

interface IOnboardingHeader {
  isAtlasLogo?: boolean;
  isConnectWallet?: boolean;
  altTxnHash?: string;
}

const OnboardingHeader: FC<IOnboardingHeader> = ({
  isAtlasLogo,
  isConnectWallet = true,
  altTxnHash,
}) => {
  const { initateTwitterAuth, getTwitterUserInfo } = useTwitterFlow();
  const [twitterUserInfo, setTwitterUserInfo] = useLocalStorageState<{
    user?: ITwitterUser;
    isConnected: boolean;
  }>("twitterUserInfo");
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
        <div className="flex">
          <RenderIf isTrue={Boolean(isAtlasLogo)}>
            <Link
              to="/"
              style={{ textDecoration: 'none', }}
            >
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
            <Link
              to="/"
              style={{ textDecoration: 'none', }}
            >
              <img
                style={{
                  cursor: "pointer",
                }}
                src={Icons.glphyLogo}
                alt=""
              />
            </Link>
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
            <Item text={"Documentation"} />
            <Item text={"About Us"} />
            <RenderIf isTrue={!twitterUserInfo?.isConnected as boolean}>
              <Button
                gap="1rem"
                display="flex"
                justifyContent="center"
                alignItems="center"
                border='1px solid #fffdfb'
                backgroundColor="transparent"
                boxShadow="none"
                borderRadius="100px"
                color='#fffdfb'
                fontWeight="700"
                size="1.6rem"
                hoverBackgroundColor="transparent"
                onClick={async () => {
                  sessionStorage.setItem("from", "maps");
                  const url = await initateTwitterAuth();
                  window.open(url, "_self");
                }}
              >
                <img
                  src={Icons.twitterWhite}
                  alt=""
                  width={"20px"}
                  height={"20px"}
                />
                Connect Twitter
              </Button>
            </RenderIf>
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
