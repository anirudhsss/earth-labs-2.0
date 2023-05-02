import { Icons } from "constant";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Container } from "../Container";
import RenderIf from "../RenderIf";
import { ConnectButton, useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import { useConnect } from "wagmi";
interface IOnboardingHeader {
  isAtlasLogo?: boolean;
  isConnectWallet?: boolean;
}

const OnboardingHeader: FC<IOnboardingHeader> = ({
  isAtlasLogo,
  isConnectWallet = true,
}) => {
  const navigate = useNavigate();
  const { openConnectModal } = useConnectModal();
  const Item = ({ text }: { text: string }) => {
    return (
      <li
        style={{
          fontSize: "1.6rem",
          color: "#fff",
        }}
      >
        {text}
      </li>
    );
  };
  return (
    <Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
          height: "6.8rem",
          borderBottom: "1px solid #fff",
        }}
      >
        <div className="flex">
          <RenderIf isTrue={Boolean(isAtlasLogo)}>
            <img
              style={{
                cursor: "pointer",
                height: "64px",
                width: "120px",
              }}
              src={Icons.atlasDark}
              onClick={() => {
                navigate("/maps");
              }}
            />
          </RenderIf>
          <RenderIf isTrue={!Boolean(isAtlasLogo)}>
            <img
              style={{
                cursor: "pointer",
              }}
              src={Icons.glphyLogo}
              onClick={() => {
                navigate("/maps");
              }}
            />
          </RenderIf>
        </div>
        <div className="flex">
          <ul
            style={{
              gap: "2rem",
              listStyle: "none",
            }}
            className="flex flex-row align-items-center"
          >
            <Item text={"Documentation"} />
            <Item text={"About Us"} />
            <RenderIf isTrue={isConnectWallet}>
              <li>
                {/* <Button
                  color="#1C223D"
                  padding="0rem 4rem"
                  height={"40px"}
                  backgroundColor="#fff"
                  borderRadius="200px"
                  onClick={openConnectModal}
                >
                  <span
                    style={{
                      fontSize: "1.6rem",
                    }}
                  >
                    Connect Wallet
                  </span>
                </Button> */}
                <ConnectButton />
              </li>
            </RenderIf>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default OnboardingHeader;
