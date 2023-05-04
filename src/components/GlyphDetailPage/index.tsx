import { Container } from "components/shared/Container";
import GlyphDetail from "components/shared/GlyphDetail";
import { useLocation } from "react-router-dom";
import OnboardingHeader from "components/shared/OnboardingHeader/onboarding-header";


const GlyphDetailPage = () => {
  const location = useLocation();
  console.log()
  return (
    <Container backgroundColor="#1C223D">
      <OnboardingHeader isAtlasLogo={true} />
      <GlyphDetail />
    </Container>
  );
};

export default GlyphDetailPage;
