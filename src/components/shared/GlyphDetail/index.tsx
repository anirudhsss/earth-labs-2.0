import { Box } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Icons } from "constant";
import SnackbarContext from "context/snackbar.context";
import TwitterContext from "context/twitter.context";
import { IHexesDetail } from "hooks/useGetGlyphTxn";
import useTwitterFlow, { ITwitterUser } from "hooks/useTwitterFlow";
import BasicModal from "modals/Modal";
import React from "react";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";
import { Button } from "../Button";
import InfoField from "../InfoField";
import RenderIf from "../RenderIf";
import Spinner from "../Spinner/Spinner";
import TwitterConnectAlert from "../TwitterConnectAlert";

const GlyphDetail: FC<IHexesDetail> = (props) => {
  const [twitterShared, setTwitterShared] = useState<{
    message?: JSX.Element;
    isTweetShared?: boolean;
  }>({});
  const [isOpen, setOpenModal] = useState<boolean>(false);

  const {
    initateTwitterAuth,
    getTwitterUserInfo,
    generateMediaId,
    tweetGlyphImageOnTwitter,
  } = useTwitterFlow();
  const { updateTwitterUser, twitterUser } = useContext(TwitterContext);
  const [isLoader, setLoader] = useState<boolean>(false);
  const [isTwitterInitLoading, setTwitterInitLoading] =
    useState<boolean>(false);
  const navigate = useNavigate();
  const {openSnackBar} = useContext(SnackbarContext);
  const processTwitterAuthentication = useCallback(async () => {
    const code = localStorage.getItem("code");

    if (code) {
      localStorage.setItem("fromTwitter", "twitter");
      try {
        const user = await getTwitterUserInfo(
          "state",
          code,
          window.location.origin
        );
        if (updateTwitterUser) updateTwitterUser(user);
      } catch (e) {
        setOpenModal(true);
      }
    }
  }, [getTwitterUserInfo]);

  useEffect(() => {
    const flag = localStorage.getItem("fromTwitter");
    if (twitterUser && flag) {
      setOpenModal(true);
    }
  }, [twitterUser]);

  useEffect(() => {
    processTwitterAuthentication();
    return () => {
      removeCode();
    };
  }, [processTwitterAuthentication]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("message");
    };
  }, []);

  const removeCode = () => {
    localStorage.removeItem("code");
  };

  const text = `${props.altText} at
  ${new Date(props.timeStamp).toLocaleDateString()}
  Check it out on Atlas: ${window.location?.href} 
  by @atlasxy_ #atlas`;

  useEffect(() => {
    if (props) {
      localStorage.setItem("message", text);
    }
  }, [props]);

  const ShareTwitterGlyphContent = () => {
    return (
      <div
        style={{
          width: "auto",
          gap: "2.5rem",
        }}
        className="flex flex-column"
      >
        <div
          className="flex justify-content-center align-items-center"
          style={{
            padding: "2rem",
            width: "auto",
            borderRadius: "3rem",
          }}
        >
          <img src={props.glyphURL} alt="" width={500} height={430} />
        </div>
        <div style={{ fontSize: "2rem", textAlign: "center" }}>
          Modify your Tweet here.
        </div>
        <div
          style={{
            backgroundColor: "#D9D9D9",
            borderRadius: "2rem",
            padding: "2.5rem",
            fontSize: "2rem",
            gap: "2rem",
            color: "#4E4E4E",
          }}
          className={"flex flex-column"}
        >
          <div id="contentEditable">
            <span
              contentEditable={true}
              onInput={(e: any) => {
                localStorage.setItem(
                  "message",
                  String(e.target.innerText).replace("\\n", "\n")
                );
              }}
            >
              {text}
            </span>
          </div>
        </div>
        <div
          style={{
            gap: "1rem",
          }}
          className="flex flex-row w-100 justify-content-center align-items-center"
        >
          <button
            onClick={() => {
              setOpenModal(false);
              removeCode();
              localStorage.removeItem("fromTwitter");
            }}
            style={{
              color: "#000",
              fontSize: "2rem",
              border: "1px solid #000",
              borderRadius: "3rem",
              backgroundColor: "transparent",
              padding: "0.5rem 5rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "4.5rem",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <Button
            onClick={async () => {
              localStorage.removeItem("fromTwitter");
              setLoader(true);
              try {
                const mediaId = await generateMediaId(
                  props.glyphURL as string,
                  twitterUser?.id as string,
                  twitterUser?.username as string
                );
                const message = localStorage.getItem("message");
                const data = await tweetGlyphImageOnTwitter(
                  mediaId,
                  twitterUser?.id as string,
                  message as string
                );
                setLoader(false);
                if (data) {
                  setOpenModal(false);

                  if (!props.isMapScreen) {
                    setTwitterShared({
                      message: (
                        <>
                          <span>First Glyph shared on Twitter! </span>
                          ...directing you to Maps view in{" "}
                        </>
                      ),
                      isTweetShared: true,
                    });
                  }

                  if (props.isMapScreen) {
                    setTwitterShared({
                      message: (
                        <>
                          <span>Glyph succesfully shared on Twitter !</span>{" "}
                          <a href={data.text}>View your tweet !</a>
                        </>
                      ),
                      isTweetShared: true,
                    });
                  }

                  removeCode();
                }
              } catch (e) {
                setLoader(false);
              }
            }}
            color="#fff"
            size="2rem"
            borderRadius="3rem"
            backgroundColor="#FE7D06"
            padding="0.5rem 5rem"
            display="flex"
          >
            <Spinner isLoading={isLoader} />
            <RenderIf isTrue={!isLoader}>
              <span>Tweet!</span>
            </RenderIf>
          </Button>
        </div>
      </div>
    );
  };

  const ActivityDetailsContent = (props: { from: string; to: string }) => {
    const LabelValue = ({ label, value }: { label: string; value: string }) => {
      return (
        <div
          className="flex flex-row"
          style={{
            gap: "2rem",
          }}
        >
          <label className="font-size-20 color-white">{label}</label>
          <span className="font-size-20 color-white">{value}</span>
        </div>
      );
    };

    return (
      <div
        className="flex flex-column"
        style={{
          gap: "2rem",
        }}
      >
        <LabelValue label="from:" value={props.from} />
        <LabelValue label="to:" value={props.to} />
      </div>
    );
  };

  const MemoImage = React.memo(function Image({
    src,
    width,
    height,
  }: {
    src: string;
    width: string;
    height: string;
  }) {
    return <img src={src} width={width} height={height} />;
  });

  const AlertContent = () => {
    const [timerTime, setTimerTime] = useState<string>();
  

    useEffect(() => {
      if (twitterShared.isTweetShared && !props.isMapScreen) {
        timer();
      }
    }, [twitterShared.isTweetShared]);

    const timer = () => {
      var sec = 5;
      var timer = setInterval(function () {
        setTimerTime("00:0" + sec);
        sec--;
        if (sec < 0) {
          localStorage.setItem("wallet", "true");
          navigate("/maps");
        }
        if (sec < 0) {
          clearInterval(timer);
        }
        return () => {
          clearInterval(timer);
        };
      }, 1000);
    };



    return (
      <RenderIf isTrue={twitterShared?.isTweetShared as boolean}>
        <div className="flex justify-content-center align-items-center ">
          <Alert
            text={
              (
                <>
                  {twitterShared.message}
                  <span>{timerTime}</span>
                </>
              ) as JSX.Element
            }
            icon={Icons.bells}
          />
        </div>
      </RenderIf>
    );
  };

  const DetailContent = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "",
            flexDirection: "column",
          }}
        >
          <div
            className="flex w-100 h-100"
            style={{
              padding: "5rem 20rem",
              gap: "10rem",
              height: "calc(100vh - 68px)",
              justifyContent: "center",
              alignItems: "start",
              position: "relative",
            }}
          >
            <RenderIf isTrue={!props.isMapScreen}>
              <div
                onClick={() => {
                  localStorage.removeItem("txnHash");
                  navigate(-1);
                }}
                style={{
                  position: "absolute",
                  top: "30px",
                  right: "80px",
                  cursor: "pointer",
                }}
              >
                <svg
                  style={{
                    height: "30px",
                    width: "30px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#ffffff"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </RenderIf>

            <div
              className="flex-1 w-full flex flex-column align-items-center"
              style={{
                gap: "5rem",
              }}
            >
              <MemoImage
                src={props.glyphURL}
                width={"423px"}
                height={"423px"}
              />

              <div className="flex flex-column" >
                <RenderIf isTrue={!twitterShared.isTweetShared}>
                  <Button
                    width={`${props.altTxnHash && "30rem"}`}
                    color="#fff"
                    size="2rem"
                    borderRadius="3rem"
                    backgroundColor="#FE7D06"
                    padding="0.5rem 3rem"
                    display="flex"
                    hoverBackgroundColor="#FE7D06"
                    onClick={async () => {

                    }}
                  >
                    <Spinner isLoading={isTwitterInitLoading} />
                    <RenderIf isTrue={!isTwitterInitLoading}>
                      <div
                        className="flex align-items-center"
                        style={{
                          gap: "1rem",
                        }}
                      >
                        <RenderIf
                          isTrue={!twitterShared?.isTweetShared as boolean}
                        >
                          <>
                            <img
                              src={Icons.twitter}
                              alt=""
                              width={30}
                              height={25}
                            />
                            <span>Share on Twitter</span>
                          </>
                        </RenderIf>
                      </div>
                    </RenderIf>
                  </Button>
                </RenderIf>
              </div>

              <div
                style={{
                  gap: "1rem",
                }}
                className="flex w-full flex-row align-items-center"
              >
                <RenderIf isTrue={!twitterShared?.isTweetShared}>
                  <Box
                    sx={{
                      width: "300px",
                      marginTop: "-10px!important",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <img src={Icons.trophy} alt="" />
                    <span
                      style={{
                        fontSize: "1.6rem",
                        color: "#fff",
                        marginLeft: "10px",
                      }}
                    >
                      Connect your twitter and win future Airdrops from Earth
                      Labs!
                    </span>
                  </Box>
                </RenderIf>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div
                className="flex w-100 flex-column"
                style={{
                  listStyle: "none",
                  padding: "0px",
                  gap: "3rem",
                }}
              >
                <InfoField
                  text={props.altText}
                  label="For Humans"
                  hideTransparency={!!props.altTxnHash}
                />
                <InfoField
                  text={props.txnHash}
                  label="Transaction Hash"
                  hideTransparency={!!props.altTxnHash}
                />
                <InfoField
                  text={`${props.cValue}`}
                  label="Transacted Value (ETH)"
                  hideTransparency={!!props.altTxnHash}
                />
                <InfoField
                  text="GlyphDetail"
                  label="Activity Details"
                  content={
                    <ActivityDetailsContent
                      from={props.sAddress}
                      to={props.tAddress}
                    />
                  }
                  hideTransparency={!!props.altTxnHash}
                />
                <InfoField
                  text={new Date(props.timeStamp).toLocaleDateString()}
                  label="Date & Time"
                  hideTransparency={!!props.altTxnHash}
                />
                <InfoField
                  text={`${props.gasPaidGwei}`}
                  label="Gas Price (ETH)"
                  hideTransparency={!!props.gasPaidUSD}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <AlertContent />
      <DetailContent />
      <BasicModal
        width={"500px"}
        handleClose={() => {
          setOpenModal(false);
        }}
        open={isOpen}
        content={<ShareTwitterGlyphContent />}
      />
    </>
  );
};

export default GlyphDetail;
