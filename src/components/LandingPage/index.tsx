import { Container } from "components/shared/Container";
import { Header } from "components/shared/Header";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import { Icons } from "constant";
import InfoField from "components/shared/InfoField";
import CopyContainer from "components/shared/CopyContainer";
import { NormalSearchField } from "components/shared/TextField";
import { Button } from "components/shared/Button";
import { height } from "@mui/system";
import { Link } from "react-router-dom";

export interface LandingPageProps {}

export const LandingPage = ({}: LandingPageProps) => {
  const location = useLocation();
  const landingPageLocation = location?.state?.icon === "/";
  return (
    <Container backgroundColor="#1C223D" height={"100vh"} overflow={"hidden"}>
      <Header landingPageLocation={landingPageLocation} />
      <div
        className={styles.landing_inner}
        style={{
          overflow: "hidden",
          backgroundImage: `url('${Icons.landingBg}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          height: "100vh",
          backgroundSize: "100rem",
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
                padding={"10px"}
                placeholderColor={"#fff"}
                placeholderFontSize={"2rem"}
                fontSize={"2rem"}
                searchIconColor={"#fff"}
                iconSize={"2rem"}
              />
              <Link
                to="/txn"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button
                  onClick={() => {}}
                  backgroundColor="#FE7D06"
                  borderRadius="2rem"
                  height={"4.5rem"}
                  width={"13rem"}
                  size={"2rem"}
                >
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
