import { Container } from "components/shared/Container";
import { Header } from "components/shared/Header";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./styles.module.css";
import { Icons } from "constant";
import InfoField from "components/shared/InfoField";
import CopyContainer from "components/shared/CopyContainer";
import { NormalSearchField } from "components/shared/TextField";
import { Button } from "components/shared/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import OnboardingHeader from "components/shared/OnboardingHeader/onboarding-header";

export interface LandingPageProps {}

export const LandingPage = ({}: LandingPageProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [txnHash, setTxnHash] = useState<string>("");

  useEffect(() => {
    processTwitterAuthentication();
  }, []);

  const processTwitterAuthentication = async () => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");
    const from = sessionStorage.getItem("from");
    if (state && code) {
      localStorage.setItem("code", code);
      if (from === "maps") {
        navigate("/maps");
      } else {
        navigate("/txn/1");
      }
    }
  };

  return (
    <Container backgroundColor="#1C223D" height={"100vh"} overflow={"hidden"}>
      <OnboardingHeader isConnectWallet={false} />
      <section
        className={styles.landing_inner}
        style={{
          overflow: "hidden",
          backgroundImage: `url('${Icons.landingBg}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          backgroundSize: "900px",
          height: "inherit",
        }}
      >
        <img src={Icons.atlasWhite} width={300} height={150}></img>
        <div className={styles.landing_inner_content}>
          <div className={styles.landing_inner_content_top}>
            <InfoField
              label="1. Copy the transaction # below"
              text="Allen sent Kenta $4,000 in USDC on March 29th, 2023."
            />
            <CopyContainer
              text={
                "0x4b8e90a5465a30c54910d7c9799237bd5d7e33ab33db561c98ca69758026c055"
              }
            />
          </div>
          <div className={styles.landing_inner_content_bottom}>
            <span className={styles.landing_inner_content_bottom_label}>
              2. Paste the transaction # and generate your first Glyph on Atlas.
            </span>
            <div className={styles.landing_innter_content_search}>
              <NormalSearchField
                borderColor="#fff"
                padding={"1rem"}
                placeholderColor={"#fff"}
                placeholderFontSize={"2rem"}
                fontSize={"1.6rem"}
                searchIconColor={"#fff"}
                iconSize={"2rem"}
                onChange={(value: string) => {
                  setTxnHash(value);
                }}
              />
              <Button
                onClick={() => {
                  navigate(`/txn/${txnHash}`);
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
          </div>
        </div>
      </section>
    </Container>
  );
};
