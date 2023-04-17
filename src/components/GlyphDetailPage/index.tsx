import { Container } from "components/shared/Container";
import GlyphDetail from "components/shared/GlyphDetail";
import { Header } from "components/shared/Header";
import { useLocation } from "react-router-dom";

const GlyphDetailPage = () => {
  const location = useLocation();
  const landingPageLocation = location?.state?.icon === "/";
  return (
    <Container backgroundColor="#1C223D" height={"100%"}>
      <Header landingPageLocation={landingPageLocation} />
      <GlyphDetail />
    </Container>
  );
};

export default GlyphDetailPage;
