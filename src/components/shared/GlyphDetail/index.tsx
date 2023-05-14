import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Icons } from "constant";
import { IHexesDetail } from "hooks/useGetGlyphTxn";
import useTwitterFlow, { ITwitterUser } from "hooks/useTwitterFlow";
import BasicModal from "modals/Modal";
import { FC, useEffect, useState } from "react";
import Alert from "../Alert/Alert";
import { Button } from "../Button";
import InfoField from "../InfoField";
import RenderIf from "../RenderIf";

const GlyphDetail: FC<IHexesDetail> = (props) => {
  console.log(props);
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const [user, setUser] = useState<ITwitterUser>({});
  const {
    initateTwitterAuth,
    getTwitterUserInfo,
    generateMediaId,
    tweetGlyphImageOnTwitter,
  } = useTwitterFlow();

  const { openConnectModal } = useConnectModal();

  // Checking if state and code  is there or not
  useEffect(() => {
    processTwitterAuthentication();
    return () => {
      removeCode();
    };
  }, []);

  const processTwitterAuthentication = async () => {
    const code = localStorage.getItem("code");
    if (code) {
      setOpenModal(true);
      const user = await getTwitterUserInfo(
        "state",
        code,
        window.location.origin
      );
      setUser(user);
    }
  };

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
            backgroundColor: "#1C223D",
            padding: "2rem",
            width: "auto",
            borderRadius: "3rem",
          }}
        >
          <img src={Icons.glyphSample} width={500} height={350} />
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
          <span>
            {" "}
            Modify your tweet here. @allen-hena transferred @gayatri 0.585 ETH
            at 15:22:05 on Feb 13th, 2023.{" "}
          </span>
          <span> #atlas #blockchain #explorer #hexagon @atlas_xyz</span>
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
              setOpenModal(false);
              const mediaId = await generateMediaId(
                "https://dotearth.blob.core.windows.net/dotearthdemo/glyphs/glyph-87738138.png",
                user.id as string,
                user.username as string
              );
              const data = await tweetGlyphImageOnTwitter(
                mediaId,
                user.id as string
              );
              if (data) {
                setOpenModal(false);
                setAlertOpen(true);
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
            Tweet!
          </Button>
        </div>
        <div
          style={{
            fontSize: "1.6rem",
          }}
          className="flex w-100 justify-content-center align-items-center"
        >
          <span>signed in as @Kenta_Koga (not you?)</span>
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
      <RenderIf isTrue={isAlertOpen}>
        <div className="flex justify-content-center">
          <Alert text="First Glyph shared on Twitter!" icon={Icons.bells} />
        </div>
      </RenderIf>
      <div
        className="flex w-100 h-100"
        style={{
          padding: "5rem 20rem",
          gap: "10rem",
          height: "100vh",
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
          <img src={props.glyphURL} width={"423px"} height={"489px"}></img>
          <div className="flex flex-column">
            <Button
              color="#fff"
              size="2rem"
              borderRadius="3rem"
              backgroundColor="#FE7D06"
              padding="0.5rem 3rem"
              display="flex"
              hoverBackgroundColor="#FE7D06"
              onClick={async () => {
                if (!isAlertOpen) {
                  const url = await initateTwitterAuth("2");
                  window.open(url, "_self");
                  return;
                }
                if (openConnectModal) openConnectModal();
              }}
            >
              <div
                className="flex align-items-center"
                style={{
                  gap: "1rem",
                }}
              >
                <RenderIf isTrue={isAlertOpen}>
                  <span>Connect Your Wallet</span>
                </RenderIf>
                <RenderIf isTrue={!isAlertOpen}>
                  <>
                    <img src={Icons.twitter} width={30} height={25} />
                    <span>Share your 1st glyph on Twitter!</span>
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
              <>
                <img src={Icons.trophy} />
                <span
                  style={{
                    fontSize: "1.6rem",
                    color: "#fff",
                  }}
                >
                  Connect your twitter and win future Airdrops from Earth Labs!
                </span>
              </>
            </RenderIf>
            <RenderIf isTrue={isAlertOpen}>
              <>
                <img src={Icons.clock} width={30} height={25} />
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
              text="Allen sent Kenta $4,000 in USDC on March 29th, 2023"
              label="For Humans"
            />
            <InfoField text={props.txnHash} label="Transaction Hash" />
            <InfoField text={`${props.cValue} ETH ($47.08)`} label="Value" />
            <InfoField
              text="GlyphDetail"
              label="Activity Details"
              content={
                <ActivityDetailsContent
                  from={props.sAddress}
                  to={props.tAddress}
                />
              }
            />
            <InfoField text={props.timeStamp} label="Date & Time" />
            <InfoField text={`$${props.cValue} / ETH`} label="Ether Price" />
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
