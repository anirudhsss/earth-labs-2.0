import { Container } from "components/shared/Container";
import GlyphDetail from "components/shared/GlyphDetail";
import { useLocation } from "react-router-dom";
import Hexagon from "public/assets/Hexagon.svg";
import { Icons } from "constant";
import { height } from "@mui/system";
import { StringifyOptions } from "querystring";
import { Button } from "components/shared/Button";
import OnboardingHeader from "components/shared/OnboardingHeader/onboarding-header";

const GlyphDetailPage = () => {
  const location = useLocation();
  const landingPageLocation = location?.state?.icon === "/";

  return (
    <Container backgroundColor="#1C223D">
      <OnboardingHeader isAtlasLogo={true} />
      <GlyphDetail />
    </Container>
  );
};

export default GlyphDetailPage;
