import { Container } from "components/shared/Container";
import GlyphDetail from "components/shared/GlyphDetail";
import OnboardingHeader from "components/shared/OnboardingHeader/onboarding-header";
import RenderIf from "components/shared/RenderIf";
import useGetGlyphDetails, { IHexesDetail } from "hooks/useGetGlyphTxn";

export interface GlyphDetailPageProps {
  altTxnHash?: string;
}

const GlyphDetailPage = ({ altTxnHash }: GlyphDetailPageProps) => {
  const url = window.location.pathname;
  const txnHash = altTxnHash ? altTxnHash : url.split("/txn/")[1];
  const { glphyDetails } = useGetGlyphDetails(txnHash);

  return (
    <Container
      backgroundColor="#1C223D"
    // opacity={`${altTxnHash ? '0.1' : '1'}`} 
    >
      <OnboardingHeader isAtlasLogo={true} altTxnHash={altTxnHash} />

      <RenderIf
        isTrue={
          Boolean(glphyDetails && Object.keys(glphyDetails as IHexesDetail).length > 0)
        }
      >
        <GlyphDetail {...(glphyDetails as IHexesDetail)} altTxnHash={altTxnHash} />
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
