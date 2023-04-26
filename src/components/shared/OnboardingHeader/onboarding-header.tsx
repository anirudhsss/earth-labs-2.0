import { Icons } from "constant";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Container } from "../Container";

const OnboardingHeader = () => {
  const navigate = useNavigate();
  const Item = ({ text }: { text: string }) => {
    return (
      <li
        style={{
          fontSize: "2rem",
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
          <img
            style={{
              cursor: "pointer",
            }}
            src={Icons.glphyLogo}
            onClick={() => {
              navigate("/maps");
            }}
          />
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
              <Button color="#000" backgroundColor="#fff">
                <span
                  style={{
                    fontSize: "2rem",
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
