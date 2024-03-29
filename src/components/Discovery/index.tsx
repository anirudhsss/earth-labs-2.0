import { Box } from "@mui/material";
import PostHeaderLayer from "components/PostHeaderLayer";
import { Button } from "components/shared/Button";
import { Container } from "components/shared/Container";
import { Header } from "components/shared/Header";
import { RhsNav } from "components/shared/RhsNav";
import { Typography } from "components/shared/Typography";
import { AxiosFetch } from "components/utils";
import { useEffect } from "react";
import styles from "./styles.module.css";
import ReactGA from 'react-ga';
export interface DiscoveryProps {
  openMenu1?: any;
  currency?: any;
  onOpenYearMenu1?: any;
  anchorEl1?: any;
  onCloseYearMenu1?: any;
  chosenCurrency?: any;
  onValueMenuItemClicked1?: any;
  onChosingCurrency?: any;
  currName?: any;
}

const Discovery = ({
  openMenu1,
  currency,
  onOpenYearMenu1,
  anchorEl1,
  onCloseYearMenu1,
  chosenCurrency,
  onValueMenuItemClicked1,
  onChosingCurrency,
  currName,
}: DiscoveryProps) => {


  useEffect(() => {
    // Track page view for the home page
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  
  const { apiLoading } = AxiosFetch();

  return (
    <Box
      sx={{
        backgroundColor: "#FFFDFB",
        height: "100%",
      }}
    >
      <Header onSearchTxn={() => {}} />

      <Container padding="0 3rem 0 2rem" height="92%">
        <PostHeaderLayer
          apiLoading={apiLoading}
          openMenu1={openMenu1}
          currency={currency}
          onOpenYearMenu1={onOpenYearMenu1}
          anchorEl1={anchorEl1}
          onCloseYearMenu1={onCloseYearMenu1}
          chosenCurrency={chosenCurrency}
          onValueMenuItemClicked1={onValueMenuItemClicked1}
          onChosingCurrency={onChosingCurrency}
          currName={currName}
        />

        <Box className={styles.body}>
          {/* {helpIconClicked ?
                        <HelpPage /> : */}
          <Box className={styles.lhsBody}>
            <Box
              className={styles.bwText}
              // sx={{ marginLeft: '16rem' }}
            >
              <Box>
                <Typography
                  text="Newest Users"
                  margin="3rem 0 0 12rem"
                  fontSize="2.5rem"
                  fontWeight="bold"
                />
              </Box>
              <Box>
                <Button
                  width="70px"
                  height="30px"
                  backgroundColor="#1C223D"
                  hoverBackgroundColor="#1C223D"
                  border="0.5px solid #000000"
                  borderRadius="20px"
                >
                  <Typography
                    text="See All"
                    // margin='3rem 0 0 12rem'
                    fontSize="1.2rem"
                  />
                </Button>
              </Box>
            </Box>
            <Box
              className={styles.glyphContainerParent}
              sx={{
                margin: "0 0 0 5rem",
              }}
            >
              <span className={styles.glyphContainer}>
                <img src="./testImage.png" alt="" width="350px" />
                <Typography
                  text="Share | Go to Map"
                  fontSize="1.2rem"
                  fontWeight="bold"
                  width="10rem"
                />
              </span>
              <span className={styles.glyphContainer1}>
                <img src="./testImage.png" alt="" width="350px" />
                <Typography
                  text="Share | Go to Map"
                  fontSize="1.2rem"
                  fontWeight="bold"
                  width="10rem"
                />
              </span>
              <span className={styles.glyphContainer1}>
                <img src="./testImage.png" alt="" width="350px" />
                <Typography
                  text="Share | Go to Map"
                  fontSize="1.2rem"
                  fontWeight="bold"
                  width="10rem"
                />
              </span>
              <span className={styles.glyphContainer1}>
                <img src="./testImage.png" alt="" width="350px" />
                <Typography
                  text="Share | Go to Map"
                  fontSize="1.2rem"
                  fontWeight="bold"
                  width="10rem"
                />
              </span>
              <span className={styles.glyphContainer1}>
                <img src="./testImage.png" alt="" width="350px" />
                <Typography
                  text="Share | Go to Map"
                  fontSize="1.2rem"
                  fontWeight="bold"
                  width="10rem"
                />
              </span>
            </Box>
            <Box className={styles.bwText} sx={{ marginTop: "6rem" }}>
              <Box>
                <Typography
                  text="Largest Transactions"
                  margin="3rem 0 0 12rem"
                  fontSize="2.5rem"
                  fontWeight="bold"
                />
              </Box>
              <Box>
                <Button
                  width="70px"
                  height="30px"
                  backgroundColor="#1C223D"
                  hoverBackgroundColor="#1C223D"
                  border="0.5px solid #000000"
                  borderRadius="20px"
                >
                  <Typography
                    text="See All"
                    // margin='3rem 0 0 12rem'
                    fontSize="1.2rem"
                  />
                </Button>
              </Box>
            </Box>
            <Box
              className={styles.glyphContainerParent}
              sx={{
                margin: "0 0 0 5rem",
              }}
            >
              <span className={styles.glyphContainer}>
                <img src="./testImage.png" alt="" width="350px" />
                <Typography
                  text="Share | Go to Map"
                  fontSize="1.2rem"
                  fontWeight="bold"
                  width="10rem"
                />
              </span>
              <span className={styles.glyphContainer1}>
                <img src="./testImage.png" alt="" width="350px" />
                <Typography
                  text="Share | Go to Map"
                  fontSize="1.2rem"
                  fontWeight="bold"
                  width="10rem"
                />
              </span>
              <span className={styles.glyphContainer1}>
                <img src="./testImage.png" alt="" width="350px" />
                <Typography
                  text="Share | Go to Map"
                  fontSize="1.2rem"
                  fontWeight="bold"
                  width="10rem"
                />
              </span>
              <span className={styles.glyphContainer1}>
                <img src="./testImage.png" alt="" width="350px" />
                <Typography
                  text="Share | Go to Map"
                  fontSize="1.2rem"
                  fontWeight="bold"
                  width="10rem"
                />
              </span>
              <span className={styles.glyphContainer1}>
                <img src="./testImage.png" alt="" width="350px" />
                <Typography
                  text="Share | Go to Map"
                  fontSize="1.2rem"
                  fontWeight="bold"
                  width="10rem"
                />
              </span>
            </Box>
          </Box>
          {/* } */}
          <RhsNav />
        </Box>
      </Container>
    </Box>
  );
};

export default Discovery;
