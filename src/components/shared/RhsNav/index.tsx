import { Box, Tooltip } from "@mui/material";
import { Icons } from "constant";
import useNavigateMaps from "hooks/useNavigateMaps";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import { Button } from "../Button";
import { Typography } from "../Typography";
import styles from "./styles.module.css";
import { FiHexagon } from "react-icons/fi";

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
              <Tooltip
                title={
                  isConnected
                    ? "Go to your map"
                    : "Please connect your wallet to see your map"
                }
              >
                <span
                  className={styles.iconOuter}
                  style={{
                    backgroundColor: walletLocation ? "#FFF7EE" : "#FFF7EE",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40px",
                    width: "40px",
                  }}
                >
                  <FiHexagon size={25} color={isConnected ? "#FF494A" : '#666666'} />
                </span>
              </Tooltip>
            </Link>
            <Link to="/discovery">
              <span
                className={styles.iconOuter}
                style={{
                  backgroundColor: walletLocation ? "#FFF7EE" : "#FFF7EE",
                  marginTop: "1rem",
                }}
              >
                <img
                  // src='/assets/images/discovery.svg'
                  src={`${
                    discoveryLocation
                      ? "/assets/images/discovery_highlighted.svg"
                      : "/assets/images/discovery.svg"
                  }`}
                  alt=""
                  className={styles.imageAsIcon}
                />
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
            <img
              width="40px"
              src={
                helpIconClicked
                  ? "/assets/images/help_highlighted.svg"
                  : "/assets/images/help.svg"
              }
              alt=""
              onClick={onHelpIconClicked}
            />

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
          </Box>
          {/* <Box sx={{ height: '9vh' }} className={styles.timeMenuBtn}>
                        {(mapsLocation || homeLocation) && !openWalletModal &&
                            <Box>
                                <Button
                                    backgroundColor="#FFF7EE"
                                    hoverBackgroundColor="#FFF7EE"
                                    color="black"
                                    boxShadow="none"
                                    hoverBoxShadow="none"
                                    borderRadius={`${openMenu ? '0 0 2rem 2rem' : '2rem'}`}
                                    padding="5px 22px"
                                    width="85px"
                                    display="flex"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    border="1px solid #000"
                                    borderTop={`${openMenu ? '0' : '1px solid #000'}`}
                                    paddingTop={`${openMenu && '0px'}`}
                                    onClick={onOpenYearMenu}
                                    disabled={monthOrYear === ''}
                                >
                                    {years?.length > 0 ?
                                        <Typography
                                            text={`${years[0].month}`}
                                            fontSize="13px"
                                            color={`${openMenu ? '#FE7D06' : '#000'}`}
                                        />
                                        : <Typography
                                            text="time"
                                            fontSize="13px"
                                            color={`${openMenu ? '#FE7D06' : '#000'}`}
                                        />}
                                    <img
                                        src={`${openMenu ? '/assets/images/orangeTriangle.svg' : '/assets/images/blackTriangle.svg'}`}
                                        alt=""
                                        className={styles.blackTriangle}
                                        style={{
                                            transform: openMenu ? '' : 'rotate(180deg)',
                                        }}
                                    />
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={openMenu}
                                    onClose={onCloseYearMenu}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    PaperProps={{
                                        elevation: 0,
                                        style: {
                                            width: '85px',
                                            borderRadius: '20px 20px 0 0',
                                            backgroundColor: '#FFF7EE',
                                            border: '1px solid #000',
                                        },

                                    }}
                                >
                                    {arrOfYears?.map((item: any) => {
                                        // console.log('item', item.month)
                                        return (
                                            <MenuItem
                                                key={item.month}
                                                onClick={() => onValueMenuItemClicked(item.month)}
                                                sx={{
                                                    fontSize: '13px',
                                                    borderBottom: '1px solid black',
                                                    '&:last-child': {
                                                        borderBottom: '0px',
                                                    },
                                                }}
                                            >{item.month}</MenuItem>
                                        )
                                    })}
                                </Menu>
                            </Box>
                        }
                    </Box> */}
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
                          // textAlign="center"
                          // margin="0 0.5rem"
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
                            // width: '6rem',
                            // display: 'flex',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            // textAlign: "center",
                            cursor: "pointer",
                          }}
                          onClick={() => onYearButtonClicked(years[0]?.month)}
                        >
                          <Typography
                            text={years[0]?.month}
                            // width="2.2rem"
                            // height="2rem"
                            // margin="0 0 0 0.5rem"
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
                            // width: '6rem',
                            // display: 'flex',
                            // justifyContent: 'center',
                            // alignItems: 'center',
                            // textAlign: "center",
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
                            // width="2.2rem"
                            // height="2rem"
                            // margin="0 0 0 0.5rem"
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
                          // textAlign="center"
                          // margin="0 0.5rem"
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
                  {/* <span>
                            <img
                                src={'./assets/images/👀.svg'}
                                alt=""
                                width="20px"
                                height="20px"

                            />
                        </span> */}
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
