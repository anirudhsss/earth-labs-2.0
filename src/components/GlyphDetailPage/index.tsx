import { Container } from "components/shared/Container";
import GlyphDetail from "components/shared/GlyphDetail";
import OnboardingHeader from "components/shared/OnboardingHeader/onboarding-header";
import RenderIf from "components/shared/RenderIf";
import useGetGlyphDetails, { IHexesDetail } from "hooks/useGetGlyphTxn";
import { useSearchParams } from "react-router-dom";

const GlyphDetailPage = () => {
  const url = window.location.pathname;
  const txnHash = url.split("/txn/")[1];
  const { glphyDetails } = useGetGlyphDetails(txnHash);
  return (
    <Container backgroundColor="#1C223D">
      <OnboardingHeader isAtlasLogo={true} />

      <RenderIf
        isTrue={
          Boolean(glphyDetails && Object.keys(glphyDetails as IHexesDetail).length > 0)
        }
      >
        <GlyphDetail {...(glphyDetails as IHexesDetail)} />
      </RenderIf>
      {/* <RenderIf isTrue={!glphyDetails}>
        <div className="h-100">
        <span>No Glyph Details to be found</span>
        </div>

      </RenderIf> */}
    </Container>
  );
};

export default GlyphDetailPage;
