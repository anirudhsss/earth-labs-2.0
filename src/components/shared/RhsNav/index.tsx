import { Box } from "@mui/material";
import { Icons } from "constant";
import useNavigateMaps from "hooks/useNavigateMaps";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import { Button } from "../Button";
import { Typography } from "../Typography";
import styles from "./styles.module.css";
import { FiHexagon, FiGlobe, FiMap } from "react-icons/fi";
import ToolTipText from "../Tooltip";

export interface RhsNavProps {
  openMenu?: any;
  onOpenYearMenu?: any;
  years?: any;
  anchorEl?: any;
  onCloseYearMenu?: any;
  arrOfYears?: any;
  onValueMenuItemClicked?: any;
  onWalletBtnClickOpen?: any;
  // onWalletBtnClickClose?: any;
  openWalletModal?: any;
  onMoveHexes?: any;
  coordinates?: any;
  // monthOrYear?: any;
  yAxisValue?: any;
  xAxisValue?: any;
  helpIconClicked?: any;
  onHelpIconClicked?: any;
  showDays?: any;
  monthInLetters?: any;
  onYearButtonClicked?: any;
  onMonthButtonClicked?: any;
  clickedElement?: any;
  onHomeHandle?: any;
}

export const RhsNav = ({
  openMenu,
  onOpenYearMenu,
  years,
  anchorEl,
  onCloseYearMenu,
  arrOfYears,
  onValueMenuItemClicked,
  onWalletBtnClickOpen,
  // onWalletBtnClickClose,
  openWalletModal,
  onMoveHexes,
  coordinates,
  // monthOrYear,
  yAxisValue,
  xAxisValue,
  helpIconClicked,
  onHelpIconClicked,
  showDays,
  monthInLetters,
  onYearButtonClicked,
  onMonthButtonClicked,
  clickedElement,
  onHomeHandle,
}: RhsNavProps) => {
  const location = useLocation();
  const homeLocation = location?.pathname.includes("/home");
  const walletLocation = location?.pathname.includes("/wallet");
  const mapsLocation = location?.pathname.includes("/maps");
  const discoveryLocation = location?.pathname.includes("/discovery");

  const { navigateToMaps } = useNavigateMaps();

  const { isConnected } = useAccount();

  return (
    <Box
      className={styles.rhsBody}
      sx={{
        height: `${walletLocation ? "75.5%" : "76%"}`,
      }}
    >
      <Box
        className={styles.allIcons}
        sx={{
          height: `${discoveryLocation ? "66.5vh" : "100%"}`,
        }}
      >
        <Box className={styles.groupedIcons1}>
          <Box className={styles.upperIcons}>
            <Link
              to="/maps"
              onClick={() => {
                if (!isConnected) {
                  return;
                }
                onHomeHandle();
                navigateToMaps();
              }}
            >
              <ToolTipText placement={'left'} text={isConnected ? "Go to Map" : "Connect Wallet"}>
                <span
                  className={styles.iconOuter}
                  style={{
                    backgroundColor: isConnected ? "#FFF7EE" : "#dddddd",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <FiMap
                    size={22}
                    strokeWidth={1}
                    color={isConnected && mapsLocation ? "#fe7d04" : "#000000"}
                  />
                </span>
              </ToolTipText>
            </Link>
            <Link to="/discovery">
              <span
                className={styles.iconOuter}
                style={{
                  backgroundColor: walletLocation ? "#FFF7EE" : "#FFF7EE",
                  marginTop: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "40px",
                  width: "40px",
                }}
              >
                <ToolTipText placement={'left'} text={"Discover"}>
                  <div>
                    <FiGlobe
                      size={25}
                      strokeWidth={1}
                      color={discoveryLocation ? "#fe7d04" : "#666666"}
                    />
                  </div>
                </ToolTipText>
              </span>
            </Link>
          </Box>
        </Box>
        <Box
          className={styles.groupedIcons2}
          sx={{
            marginBottom: `${walletLocation ? "9vh" : ""}`,
          }}
        >
          <Box className={styles.lowerIcons}>
            <ToolTipText placement={'left'} text="Legend">
              <img
                width="40px"
                style={{ cursor: "pointer" }}
                src={
                  helpIconClicked
                    ? "/assets/images/help_highlighted.svg"
                    : "/assets/images/help.svg"
                }
                alt=""
                onClick={onHelpIconClicked}
              />
            </ToolTipText>

            <ToolTipText  placement={'left'} text="Twitter">
              <a
                href="https://twitter.com/AtlasXY_"
                target="_blank"
                rel="noreferrer"
                className={styles.iconOuter}
                style={{ backgroundColor: "#FFF7EE" }}
              >
                <img
                  src={Icons.twitterBlack}
                  alt=""
                  className={styles.imageAsIcon}
                />
              </a>
            </ToolTipText>

            <ToolTipText placement={'left'} text="Discord">
              <a
                href="https://discord.com/invite/dotearth"
                target="_blank"
                rel="noreferrer"
                className={styles.iconOuter}
                style={{ backgroundColor: "#FFF7EE", marginTop: "0.9rem" }}
              >
                <img
                  src="/assets/images/discord.svg"
                  alt=""
                  className={styles.imageAsIcon}
                />
              </a>
            </ToolTipText>
          </Box>

          {(mapsLocation || homeLocation) && (
            <Box sx={{ height: "9vh" }} className={styles.yearMonthBoxParent}>
              {years[0]?.month !== undefined && (
                <Box className={styles.yearMonthBox}>
                  {showDays ? (
                    <Box className={styles.test1}>
                      <Box className={styles.test3}>
                        <Button
                          padding="2px 0"
                          backgroundColor="#FE7D06"
                          hoverBackgroundColor="#FE7D06"
                          borderRadius="1rem"
                        >
                          <Typography
                            text={monthInLetters ? monthInLetters : ""}
                            fontSize="1.4rem"
                            color="#FFFDFB"
                          />
                        </Button>
                      </Box>
                      <Box
                        className={styles.test}
                        sx={{ paddingRight: "1rem" }}
                      >
                        <span
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => onYearButtonClicked(years[0]?.month)}
                        >
                          <Typography
                            text={years[0]?.month}
                            fontSize="1.4rem"
                            color="#FFFDFB"
                          />
                        </span>
                      </Box>
                    </Box>
                  ) : (
                    <Box className={styles.test1}>
                      <Box className={styles.test} sx={{ paddingLeft: "1rem" }}>
                        <span
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={onMonthButtonClicked}
                        >
                          <Typography
                            text={
                              moment()
                                .month(clickedElement - 1)
                                .format("MMM") !== "undefined"
                                ? moment()
                                    .month(clickedElement - 1)
                                    .format("MMM")
                                : ""
                            }
                            fontSize="1.4rem"
                            color="#FFFDFB"
                          />
                        </span>
                      </Box>
                      <Box className={styles.test3}>
                        <Button
                          padding="2px 0"
                          backgroundColor="#FE7D06"
                          hoverBackgroundColor="#FE7D06"
                          borderRadius="1rem"
                        >
                          <Typography
                            text={years[0]?.month !== "" ? years[0]?.month : ""}
                            fontSize="1.4rem"
                            color="#FFFDFB"
                          />
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
