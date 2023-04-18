import Alert from "components/shared/Alert/Alert";
import { Container } from "components/shared/Container";
import GlyphDetail from "components/shared/GlyphDetail";
import { Header } from "components/shared/Header";
import RenderIf from "components/shared/RenderIf";
import { Icons } from "constant";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const GlyphDetailPage = () => {
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false);
  const location = useLocation();
  const landingPageLocation = location?.state?.icon === "/";
  return (
    <Container backgroundColor="#1C223D">
      <Header landingPageLocation={landingPageLocation} />
      <RenderIf isTrue={isAlertOpen}>
        <div className="flex justify-content-center">
          <Alert text="First Glyph shared on Twitter!" icon={Icons.bells} />
        </div>
      </RenderIf>
      <GlyphDetail
        buttonText={"Share the Glyph on twitter"}
        handleTwitterShare={() => {
          setAlertOpen(true);
        }}
      />
    </Container>
  );
};

export default GlyphDetailPage;
