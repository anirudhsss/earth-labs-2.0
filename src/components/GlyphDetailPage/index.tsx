import { Container } from "components/shared/Container";
import GlyphDetail from "components/shared/GlyphDetail";
import OnboardingHeader from "components/shared/OnboardingHeader/onboarding-header";

const GlyphDetailPage = () => {
  return (
    <Container backgroundColor="#1C223D">
      <OnboardingHeader isAtlasLogo={true} />
      <GlyphDetail />
    </Container>
  );
};

export default GlyphDetailPage;
