import { Icons } from "constant";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Container } from "../Container";
import RenderIf from "../RenderIf";

interface IOnboardingHeader {
  isAtlasLogo?: boolean;
}

const OnboardingHeader: FC<IOnboardingHeader> = ({ isAtlasLogo }) => {
  const navigate = useNavigate();
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
                height : '64px',
                width : '120px'
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
            <li>
              <Button
                color="#1C223D"
                padding="0rem 4rem"
                height={"40px"}
                backgroundColor="#fff"
                borderRadius="200px"
              >
                <span
                  style={{
                    fontSize: "1.6rem",
                  }}
                >
                  Connect Wallet
                </span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default OnboardingHeader;
