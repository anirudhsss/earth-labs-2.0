import { Box, Menu, MenuItem } from "@mui/material";
import { Button } from "components/shared/Button";
import { Typography } from "components/shared/Typography";
import { AxiosFetch, isEmpty, truncate } from "components/utils";
import { Icons } from "constant";
import useEthToUsdcConversion from "hooks/useEthToUsdcConversion";
import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import styles from "./styles.module.css";

export interface PostHeaderLayerProps {
  openMenu1?: any;
  currency?: any;
  onOpenYearMenu1?: any;
  anchorEl1?: any;
  onCloseYearMenu1?: any;
  chosenCurrency?: any;
  onValueMenuItemClicked1?: any;
  onChosingCurrency?: any;
  currName?: any;
  apiLoading?: any;
  matchedMonths?: any;
  handleName?: string;
  data?: any;
}

const PostHeaderLayer = ({
  openMenu1,
  currency,
  onOpenYearMenu1,
  anchorEl1,
  onCloseYearMenu1,
  chosenCurrency,
  onValueMenuItemClicked1,
  onChosingCurrency,
  currName,
  apiLoading,
  matchedMonths,
  handleName,
  data,
}: PostHeaderLayerProps) => {
  const location = useLocation();
  const homeLocation = location?.pathname.includes("/home");
  const walletLocation = location?.pathname.includes("/wallet");
  const mapsLocation = location?.pathname.includes("/maps");
  const discoveryLocation = location?.pathname.includes("/discovery");
  const { ethToUsdc, ethToUsdcYvsTPercent, difference } =
    useEthToUsdcConversion();
  const navigate = useNavigate();
  const [condition, setCondition] = useState<boolean>(false);
  const { isDisconnected } = useAccount();
  const onChangeText = useCallback(() => {
    if (!isEmpty(handleName as string) || handleName === ("" || null)) {
      setCondition(true);
    } else {
      setCondition(false);
    }
  }, [handleName]);

  useEffect(() => {
    onChangeText();
  }, [onChangeText]);

  const getBackgroundColor = (isPage: boolean) => {
    if (isDisconnected) {
      return "#dddddd";
    }
    if (isPage) {
      return "#FE7D06";
    }

    return "#FFF7EE";
  };

  const getTextColor = (isPage: boolean) => {
    if (isDisconnected) {
      return "#000";
    }
    if (isPage) {
      return "#fff";
    }
    return "#000";
  };

  const getHoverColor = () => {
    if (isDisconnected) {
      return "#ddd";
    }

    return "#FE7D06";
  };

  return (
    <>
      <Box
        className={styles.postHeader}
        sx={{ height: discoveryLocation ? "45px" : "8%" }}
      >
        <Box className={styles.group1}>
          {
            <Box
              className={styles.timeMenuBtn1}
              sx={{ width: homeLocation || mapsLocation ? "auto" : "8.3rem" }}
            >
              {(homeLocation || mapsLocation) && (
                <>
                  <Button
                    backgroundColor="#FFF7EE"
                    hoverBackgroundColor="#FFF7EE"
                    color="black"
                    boxShadow="none"
                    hoverBoxShadow="none"
                    borderRadius={`${openMenu1 ? "2rem 2rem 0 0" : "2rem"}`}
                    padding="5px"
                    width={`${
                      (currency?.length > 0 || openMenu1) && currName === "USDC"
                        ? "19rem"
                        : (currency?.length > 0 || openMenu1) &&
                          currName === "ETH"
                        ? "17rem"
                        : "8.3rem"
                    }`}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    border="1px solid #000"
                    borderBottom={`${openMenu1 ? "0" : "1px solid #000"}`}
                    onClick={onOpenYearMenu1}
                    height="2.9rem"
                  >
                    {currency?.length > 0 ? (
                      <Typography
                        text={`${currency}`}
                        fontSize="13px"
                        margin="0 5px 0 0"
                      />
                    ) : (
                      <Typography
                        text="value"
                        fontSize="13px"
                        color={`${openMenu1 ? "#FE7D06" : "#000"}`}
                        margin="0 5px 0 0"
                      />
                    )}
                    <img
                      src={`${
                        openMenu1 ? Icons.orangeTriangle : Icons.blackTriangle
                      }`}
                      alt=""
                      className={styles.blackTriangle}
                      style={{
                        marginTop: "2px",
                        transform: openMenu1 ? "rotate(180deg)" : "",
                      }}
                    />
                  </Button>
                  <Menu
                    anchorEl={anchorEl1}
                    open={openMenu1}
                    onClose={onCloseYearMenu1}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    PaperProps={{
                      elevation: 0,
                      style: {
                        width:
                          currName === "USDC"
                            ? "19rem"
                            : currName === "ETH"
                            ? "17rem"
                            : "",
                        borderRadius: "0 0 20px 20px",
                        backgroundColor: "#FFF7EE",
                        border: "1px solid #000",
                      },
                    }}
                  >
                    {/* {chosenCurrency?.map((item: any) => {
                                    return (
                                        <>
                                            <MenuItem
                                                key={item.id}
                                                onClick={() => onValueMenuItemClicked1(item.id)}
                                                sx={{
                                                    fontSize: '13px',
                                                    borderBottom: '1px solid black',
                                                    '&:last-child': {
                                                        borderBottom: '0px',
                                                    },
                                                }}
                                            >{item.value}</MenuItem>
                                        </>
                                    )
                                })} */}
                    {chosenCurrency?.map((item: any, index: number) => {
                      // if (item !== undefined) {
                      let res;
                      if (currName === "USDC") {
                        res =
                          (item[0] * (ethToUsdc ? ethToUsdc : 1))?.toFixed(2) +
                          " - " +
                          (
                            item[item?.length - 1] * (ethToUsdc ? ethToUsdc : 1)
                          )?.toFixed(2) +
                          " " +
                          currName;
                        // actual = (item[0] * (ethToUsdc ? ethToUsdc : 1)) + ' - ' + (item[item?.length - 1] * (ethToUsdc ? ethToUsdc : 1)) + ' ' + currName;
                      } else {
                        res =
                          item[0]?.toFixed(2) +
                          " - " +
                          item[item?.length - 1]?.toFixed(2) +
                          " " +
                          currName;
                        // actual = item[0] + ' - ' + item[item?.length - 1] + ' ' + currName;
                      }

                      return (
                        <MenuItem
                          key={index}
                          onClick={() => onValueMenuItemClicked1(index)}
                          sx={{
                            fontSize: "13px",
                            borderBottom: "1px solid black",
                            "&:last-child": {
                              borderBottom: "0px",
                            },
                          }}
                        >
                          {`${res}`}
                        </MenuItem>
                      );
                      // }
                    })}
                  </Menu>
                </>
              )}
            </Box>
          }

          {(homeLocation || mapsLocation) && (
            <Box
              sx={{
                position: "absolute",
                top: "55px",
                left: "60px",
              }}
            >
              {currency?.length > 0 && (
                <Box className={styles.sameLevel}>
                  <Typography
                    // text={`Currently Viewing: ${currency}`}
                    text={`${matchedMonths?.length}`}
                    fontSize="1.2rem"
                    color="#FE7D06"
                  />
                  &nbsp;
                  <span style={{ marginTop: "-2px" }}>
                    <img
                      src={Icons.orangeHexagon}
                      alt=""
                      style={{
                        width: "15px",
                        marginBottom: "-6px",
                      }}
                    />
                  </span>
                </Box>
              )}
            </Box>
          )}

          {
            <Box
              style={{
                width: "7rem",
                // marginLeft: (currency?.length > 0 || openMenu1) ? '19rem' : '10rem',
                marginLeft: "2rem",
                display: "flex",
                // justifyContent: (homeLocation || mapsLocation) ? 'space-evenly' : 'flex-end',
                justifyContent: "space-evenly",
              }}
            >
              {(homeLocation ||
                mapsLocation ||
                walletLocation ||
                discoveryLocation) && (
                <>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={
                      homeLocation || mapsLocation
                        ? () => onChosingCurrency("ETH")
                        : undefined
                    }
                  >
                    <Typography
                      text="ETH"
                      fontSize="13px"
                      color={`${
                        currName === "ETH"
                          ? "#FE7D06"
                          : walletLocation
                          ? "#fffdfb"
                          : "#000"
                      }`}
                    />
                  </span>
                  <Typography
                    text=" |"
                    fontSize="13px"
                    margin="0 5px"
                    color={`${walletLocation && "#fffdfb"}`}
                  />
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={
                      homeLocation || mapsLocation
                        ? () => onChosingCurrency("USDC")
                        : undefined
                    }
                  >
                    <Typography
                      text=" USDC"
                      fontSize="13px"
                      color={`${
                        currName === "USDC"
                          ? "#FE7D06"
                          : walletLocation
                          ? "#fffdfb"
                          : "#000"
                      }`}
                    />
                  </span>
                </>
              )}
            </Box>
          }

          {(homeLocation ||
            mapsLocation ||
            walletLocation ||
            discoveryLocation) &&
            !apiLoading &&
            ethToUsdc !== undefined &&
            difference !== undefined && (
              <Box
                sx={{
                  // marginLeft: (currency?.length > 0 || openMenu1) ? '11rem' : '2rem',
                  marginLeft: "3rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  <img
                    src={Icons.ethereumLogo}
                    alt=""
                    style={{
                      width: "18px",
                      height: "16px",
                    }}
                  />
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: walletLocation ? "#fffdfb" : "#000",
                  }}
                >
                  =
                </span>
                <span
                  style={{
                    marginLeft: "2px",
                  }}
                >
                  <Typography
                    text={"$" + ethToUsdc}
                    fontSize="13px"
                    fontWeight="bold"
                    color={`${walletLocation && "#fffdfb"}`}
                  />
                </span>
                <span style={{}}>
                  <img
                    src={Icons.redDownArrow}
                    alt=""
                    style={{
                      width: "12px",
                      height: "12px",
                      transform:
                        difference === "increment" ? "" : "rotate(180deg)",
                    }}
                  />
                </span>
                <span
                  style={{
                    marginTop: difference === "increment" ? "0" : "5px",
                  }}
                >
                  <Typography
                    text={ethToUsdcYvsTPercent + "%"}
                    fontSize="9px"
                    fontWeight="bold"
                    color="#EA1313"
                  />
                </span>
              </Box>
            )}
        </Box>
        <Box className={styles.group2}>
          {(homeLocation || mapsLocation || walletLocation) && handleName && (
            <Box className={styles.earthIdContainer}>
              <Box className={styles.earthIdContainerChild}>
                {condition && (
                  <img
                    src="/assets/images/favicon.svg"
                    alt=""
                    width="20"
                    height="20"
                  />
                )}
                {condition ? (
                  <span style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                    <Typography
                      text={`${handleName}`}
                      // text='woigkbvjegfhwi8y8i3op1iyriohfbbcsbcsjbcjbsfihgqwpieuhihwibckjb'
                      fontWeight="700"
                      fontSize="1.3rem"
                      color={`${
                        homeLocation || mapsLocation
                          ? "#163A70"
                          : walletLocation
                          ? "#fffdfb"
                          : ""
                      }`}
                    />
                  </span>
                ) : (
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "1.3rem",
                      color:
                        homeLocation || mapsLocation
                          ? "#163A70"
                          : walletLocation
                          ? "#fffdfb"
                          : "",
                      // paddingLeft: '1rem',
                      paddingRight: "1rem",
                    }}
                  >
                    {truncate(data?.targetAddress, 12, "....")}
                  </span>
                )}
                <img src="/assets/images/👀.svg" alt="" />
              </Box>
            </Box>
          )}
        </Box>
        {!discoveryLocation && (
          <Box className={styles.group3}>
            <Box
              sx={{
                // height: '10vh',
                width: "16.3rem",
                // paddingTop: '2rem',
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => {
                    if (isDisconnected) {
                      return;
                    }
                    navigate("/maps");
                  }}
                  backgroundColor={getBackgroundColor(
                    mapsLocation || homeLocation
                  )}
                  color={getTextColor(mapsLocation || homeLocation)}
                  border="0.5px solid rgba(46, 52, 81, 0.58)"
                  hoverBackgroundColor={getHoverColor()}
                  borderRadius="0.5rem"
                  padding="0.4rem 0.2rem"
                  width="75px"
                >
                  <Typography text="Activities" fontSize="1.3rem" />
                </Button>

                <Button
                  onClick={() => {
                    if (isDisconnected) {
                      return;
                    }
                    navigate("/wallet");
                  }}
                  backgroundColor={getBackgroundColor(walletLocation)}
                  color={getTextColor(walletLocation)}
                  border="0.5px solid rgba(46, 52, 81, 0.58)"
                  hoverBackgroundColor={getHoverColor()}
                  borderRadius="0.5rem"
                  padding="0.4rem 1.8rem"
                  margin="0 0 0 10px"
                >
                  <Typography text="Assets" fontSize="1.3rem" />
                </Button>
              </Box>
              {/* } */}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default PostHeaderLayer;
