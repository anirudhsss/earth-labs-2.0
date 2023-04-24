import { Icons } from "constant";
import useTwitterFlow from "hooks/useTwitterFlow";
import BasicModal from "modals/Modal";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Alert from "../Alert/Alert";
import { Button } from "../Button";
import InfoField from "../InfoField";
import RenderIf from "../RenderIf";

interface IGlyphDetail {
  forHumans?: string;
  txnHash?: string;
  value?: string;
  activityDetails?: {
    from: string;
    to: string;
  };
  date?: string;
  etherPrice?: string;
}

const GlyphDetail: FC<IGlyphDetail> = ({}) => {
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const [isOpen, setOpenModal] = useState<boolean>(false);
  const {
    initateTwitterAuth,
    getTwitterUserInfo,
    generateMediaId,
    tweetGlyphImageOnTwitter,
  } = useTwitterFlow();

  const [searchParams] = useSearchParams();

  // Checking if state and code  is there or not
  useEffect(() => {
    processTwitterAuthentication();
  }, []);

  const processTwitterAuthentication = async () => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");
    if (state && code) {
      setOpenModal(true);
      const user = await getTwitterUserInfo(state, code);
      const mediaId = await generateMediaId("", Number(user.id), "");
      await tweetGlyphImageOnTwitter(Number(mediaId), Number(user.id));
    }
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
            onClick={() => {
              // setOpenModal(false);
              initateTwitterAuth();
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
            fontSize: "2rem",
          }}
          className="flex w-100 justify-content-center align-items-center"
        >
          <span>signed in as @Kenta_Koga (not you?)</span>
        </div>
      </div>
    );
  };

  const ActivityDetailsContent = () => {
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
        <LabelValue
          label="from:"
          value="0x690b9a9e9aa1c9db991c7721a92d351db4fac990"
        />
        <LabelValue
          label="to:"
          value="0x388C818CA8B9251b393131C08a736A67ccB19297 (Lido: Execution Layer Rewards Vault)"
        />
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
        }}
      >
        <div
          className="flex-1 w-full flex flex-column align-items-center"
          style={{
            gap: "5rem",
          }}
        >
          <img src={Icons.glyphSample} width={"423px"} height={"489px"}></img>
          <div className="flex flex-column">
            <Button
              color="#fff"
              size="2rem"
              borderRadius="3rem"
              backgroundColor="#FE7D06"
              padding="0.5rem 3rem"
              display="flex"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <div
                className="flex align-items-center"
                style={{
                  gap: "1rem",
                }}
              >
                <img src={Icons.twitterWhite} width={30} height={25} />
                <span>Share the Glyph on twitter</span>
              </div>
            </Button>
          </div>

          <div
            style={{
              gap: "1rem",
            }}
            className="flex w-full flex-row"
          >
            <img src={Icons.trophy} />
            <span
              style={{
                fontSize: "2rem",
                color: "#fff",
              }}
            >
              Connect your twitter and win future Airdrops from Earth Labs!
            </span>
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
            <InfoField
              text="0x4b8e90a5465a30c54910d7c9799237bd5d7e33ab33db561c98ca69758026c055"
              label="Transaction Hash"
            />
            <InfoField text="0.025024691263461272 ETH ($47.08)" label="Value" />
            <InfoField
              text="GlyphDetail"
              label="Activity Details"
              content={<ActivityDetailsContent />}
            />
            <InfoField text="Apr-04-2023 08:58:11 PM UTC" label="Date & Time" />
            <InfoField text="$1,983.33 / ETH" label="Ether Price" />
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
