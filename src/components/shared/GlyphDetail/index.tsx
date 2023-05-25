import { Box } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Icons } from "constant";
import TwitterContext from "context/twitter.context";
import { IHexesDetail } from "hooks/useGetGlyphTxn";
import useTwitterFlow, { ITwitterUser } from "hooks/useTwitterFlow";
import BasicModal from "modals/Modal";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useLocalStorageState from "use-local-storage-state";
import Alert from "../Alert/Alert";
import { Button } from "../Button";
import InfoField from "../InfoField";
import RenderIf from "../RenderIf";
import Spinner from "../Spinner/Spinner";
import { Typography } from "../Typography";

const GlyphDetail: FC<IHexesDetail> = (props) => {
  const [isAlertOpen, setAlertOpen] = useState<{
    message?: string;
    isAlert?: boolean;
  }>({});
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const {
    initateTwitterAuth,
    getTwitterUserInfo,
    generateMediaId,
    tweetGlyphImageOnTwitter,
  } = useTwitterFlow();
  const { updateTwitterUser, twitterUser } = useContext(TwitterContext);

  const { openConnectModal } = useConnectModal();
  const [isLoader, setLoader] = useState<boolean>(false);

  const processTwitterAuthentication = useCallback(async () => {
    const code = localStorage.getItem("code");
    if (code) {
      setOpenModal(true);
      const user = await getTwitterUserInfo(
        "state",
        code,
        window.location.origin
      );
      if (updateTwitterUser) updateTwitterUser(user);
    }
  }, [getTwitterUserInfo]);

  // Checking if state and code  is there or not
  useEffect(() => {
    processTwitterAuthentication();
    return () => {
      removeCode();
    };
  }, [processTwitterAuthentication]);

  const removeCode = () => {
    localStorage.removeItem("code");
  };

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
            // backgroundColor: "#1C223D",
            // backgroundColor: props.altText ? '' : '#1C223D',
            padding: "2rem",
            width: "auto",
            borderRadius: "3rem",
          }}
        >
          <img src={Icons.glyphSample} alt="" width={500} height={350} />
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
              onInput={(e: any) =>
                localStorage.setItem("message", e.target.innerText)
              }
            >
              Modify your tweet here. {props.altText} at {props.timeStamp}{" "}
              #atlas #blockchain #explorer #hexagon @atlas_xyz
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
              setLoader(true);
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
                  setAlertOpen({
                    message: "First Glyph shared on Twitter!",
                    isAlert: true,
                  });
                }

                if (props.isMapScreen) {
                  setAlertOpen({
                    message: "Glyph succesfully shared on twitter !",
                    isAlert: true,
                  });
                }

                removeCode();
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
        <div
          style={{
            fontSize: "1.6rem",
          }}
          className="flex w-100 justify-content-center align-items-center"
        >
          <span>signed in as {twitterUser?.username}(not you?)</span>
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

  return (
    <>
      <RenderIf isTrue={isAlertOpen?.isAlert as boolean}>
        <div className="flex justify-content-center align-items-center ">
          <Alert text={isAlertOpen?.message as string} icon={Icons.bells} />
        </div>
      </RenderIf>
      <div
        className="flex w-100 h-100"
        style={{
          padding: "5rem 20rem",
          gap: "10rem",

          height: "calc(100vh - 68px)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="flex-1 w-full flex flex-column align-items-center"
          style={{
            gap: "5rem",
          }}
        >
          <img
            src={props.glyphURL}
            alt=""
            width={"423px"}
            height={"423px"}
          ></img>
          <div className="flex flex-column">
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
                if (!isAlertOpen?.isAlert) {
                  if (twitterUser) {
                    setOpenModal(true);
                    return;
                  }
                  const url = await initateTwitterAuth("2");
                  window.open(url, "_self");
                  return;
                }
                if (isAlertOpen?.isAlert && !props.isMapScreen) {
                  if (openConnectModal) openConnectModal();
                }
              }}
            >
              <div
                className="flex align-items-center"
                style={{
                  gap: "1rem",
                }}
              >
                <RenderIf isTrue={isAlertOpen?.isAlert as boolean}>
                  <span>Connect Your Wallet</span>
                </RenderIf>
                <RenderIf isTrue={!isAlertOpen?.isAlert as boolean}>
                  <>
                    <img src={Icons.twitter} alt="" width={30} height={25} />
                    <span>
                      Share {!props.altTxnHash && " your 1st glyph"} on Twitter!
                    </span>
                  </>
                </RenderIf>
              </div>
            </Button>
          </div>

          <div
            style={{
              gap: "1rem",
            }}
            className="flex w-full flex-row align-items-center"
          >
            <RenderIf isTrue={!isAlertOpen}>
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
                  Connect your twitter and win future Airdrops from Earth Labs!
                </span>
              </Box>
            </RenderIf>
            <RenderIf
              isTrue={(isAlertOpen?.isAlert as boolean) && !props.isMapScreen}
            >
              <>
                <img src={Icons.clock} alt="" width={30} height={25} />
                <span
                  style={{
                    fontSize: "1.6rem",
                    color: "#fff",
                  }}
                >
                  Connect your wallet and start exploring the world of Web3 on
                  Atlas!
                </span>
              </>
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
              text={`${props.cValue} ETH ($47.08)`}
              label="Value"
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
              text={props.timeStamp}
              label="Date & Time"
              hideTransparency={!!props.altTxnHash}
            />
            <InfoField
              text={`$${props.cValue} / ETH`}
              label="Ether Price"
              hideTransparency={!!props.altTxnHash}
            />
          </div>
        </div>
      </div>
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
