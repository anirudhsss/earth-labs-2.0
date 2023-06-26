import { ConnectButton } from "@rainbow-me/rainbowkit";
import Alert from "components/shared/Alert/Alert";
import { Button } from "components/shared/Button";
import { Container } from "components/shared/Container";
import CopyContainer from "components/shared/CopyContainer";
import OnboardingHeader from "components/shared/OnboardingHeader/onboarding-header";
import RenderIf from "components/shared/RenderIf";
import { NormalSearchField } from "components/shared/TextField";
import TwitterConnectAlert from "components/shared/TwitterConnectAlert";
import { Icons } from "constant";
import SnackbarContext from "context/snackbar.context";
import TwitterContext from "context/twitter.context";
import useSearchTxnAddress from "hooks/useSearchTxnAddress";
import useTwitterFlow from "hooks/useTwitterFlow";
import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useLocalStorageState from "use-local-storage-state";
import { useAccount } from "wagmi";
import styles from "./styles.module.css";

export const LandingPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTxt, setSearchTxt] = useLocalStorageState<string>("txnHash");
  const [isTxnError, setTxnError] = useState<{
    isValid: boolean;
    message: string;
  }>({ isValid: true, message: "" });
  const { getTwitterUserInfo, setTwitterConnectFlag } = useTwitterFlow();
  const { searchTxnAddress } = useSearchTxnAddress();
  const { address, isConnected } = useAccount();
  const { updateTwitterUser } = useContext(TwitterContext);
  const { openSnackBar } = useContext(SnackbarContext);
  const location = useLocation();
  const landingLocation = location?.pathname === "/";

  useEffect(() => {
    if (isConnected && landingLocation) {
      navigate(`/maps/${address}`);
    }
  }, [isConnected]);

  useEffect(() => {
    localStorage.removeItem("txnHash");
  }, []);

  const processTwitterAuthentication = useCallback(async () => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");
    const from = String(sessionStorage.getItem("from"));
    if (state && code) {
      localStorage.setItem("code", code);
      if (from === "maps") {
        localStorage.removeItem("txnHash");
        setTwitterConnectFlag();
        navigate("/maps");
      } else if (from === "landing") {
        updateTwitterUserObject();
      } else {
        setTwitterConnectFlag();
        if (searchTxt) {
          navigate(`/txn/${searchTxt}`);
        }
      }
    }
  }, [navigate, searchParams]);

  useEffect(() => {
    processTwitterAuthentication();
  }, [processTwitterAuthentication]);

  const updateTwitterUserObject = useCallback(async () => {
    const code = localStorage.getItem("code");
    if (code) {
      const user = await getTwitterUserInfo(
        "state",
        code,
        window.location.origin
      );
      if (updateTwitterUser) updateTwitterUser(user);
    }
  }, [getTwitterUserInfo]);

  return (
    <Container backgroundColor="#1C223D" height={"100vh"} overflow={"hidden"}>
      <OnboardingHeader isConnectWallet={true} isSearch={false} />
      <section
        className={styles.landing_inner}
        style={{
          overflow: "hidden",
          backgroundImage: `url('${Icons.landingBg}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0px bottom 69px",
          backgroundSize: "65%",
          height: "inherit",
        }}
      >
        <img
          src={Icons.atlasWhite}
          alt=""
          width={300}
          height={150}
          onClick={() => {
            console.log("Hello");
            if (openSnackBar) openSnackBar("Hello", 6000);
          }}
        ></img>
        <div className={styles.landing_inner_content}>
          <div className={styles.landing_inner_content_top}>
            <span
              style={{
                fontSize: "1.6rem",
                color: "#fff",
                marginLeft: "20px",
              }}
            >
              Discover the power of Atlas. Copy and paste the transaction hash
              below to get started.
            </span>
            <CopyContainer
              text={
                "0x4b8e90a5465a30c54910d7c9799237bd5d7e33ab33db561c98ca69758026c055"
              }
            />
          </div>
          <div className={styles.landing_inner_content_bottom}>
            <div className={styles.landing_innter_content_search}>
              <NormalSearchField
                width="100%"
                borderColor="#fff"
                padding={"1rem"}
                placeholderColor={"#fff"}
                placeholderFontSize={"1.6rem"}
                fontSize={"1.6rem"}
                searchIconColor={"#fff"}
                iconSize={"2rem"}
                color={"#ffffff"}
                onChange={(value: string) => {
                  setSearchTxt(value);
                }}
              />
              <Button
                onClick={() => {
                  searchTxnAddress(searchTxt as string);
                }}
                backgroundColor="#FE7D06"
                hoverBackgroundColor="#FE7D06"
                borderRadius="2rem"
                height={"4.5rem"}
                width={"13rem"}
                size={"1.6rem"}
              >
                Search
              </Button>
            </div>
            <RenderIf isTrue={!isTxnError?.isValid}>
              <div
                className="flex"
                style={{
                  gap: "0.5rem",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#fff"
                  style={{
                    height: "16px",
                    width: "16px",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#fff",
                  }}
                >
                  {isTxnError?.message}
                </span>
              </div>
            </RenderIf>
          </div>
        </div>
        <div
          className="flex flex-row landing-button"
          style={{
            gap: "2rem",
          }}
        >
          <div className="landing-button">
            <ConnectButton />
          </div>
          <Button
            backgroundColor="transparent"
            color="white"
            border="0.5px solid #fff"
            hoverBackgroundColor="transparent"
            borderRadius="10rem"
            padding="0 4rem"
            height={"5rem"}
            width={"178px"}
            onClick={() => {
              navigate("/discovery");
            }}
          >
            <span style={{ fontSize: "1.6rem" }}>Discover</span>
          </Button>
        </div>
      </section>
    </Container>
  );
};
