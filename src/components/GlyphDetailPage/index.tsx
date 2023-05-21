import { Container } from "components/shared/Container";
import GlyphDetail from "components/shared/GlyphDetail";
import OnboardingHeader from "components/shared/OnboardingHeader/onboarding-header";
import RenderIf from "components/shared/RenderIf";
import { Icons } from "constant";
import useGetGlyphDetails, { IHexesDetail } from "hooks/useGetGlyphTxn";

const GlyphDetailPage = () => {
  const url = window.location.pathname;
  const txnHash = url.split("/txn/")[1];
  const { glphyDetails } = useGetGlyphDetails(txnHash);
  return (
    <Container backgroundColor="#1C223D">
      <OnboardingHeader isAtlasLogo={true} />

      <RenderIf
        isTrue={Boolean(
          glphyDetails && Object.keys(glphyDetails as IHexesDetail).length > 0
        )}
      >
        <GlyphDetail {...(glphyDetails as IHexesDetail)} />
      </RenderIf>
      <RenderIf isTrue={!glphyDetails}>
        <div
          style={{
            padding: "5rem 15rem",
            paddingTop:'0',
            height: "calc(100vh - 68px)",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
          className="animate-pulse"
        >
          <img src={Icons.glyphDetailLoader} width={"100%"} height={"100%"} />
        </div>
      </RenderIf>
    </Container>
  );
};

export default GlyphDetailPage;
