import InfoField from "../InfoField";

const GlyphDetail = () => {
  return (
    <div
      className="flex w-full"
      style={{
        padding: "2rem",
      }}
    >
      <div className="flex-1 w-full"></div>
      <div className="flex-1 w-full">
        <ul
          className="flex w-100 flex-column"
          style={{
            listStyle: "none",
            padding: "0px",
            gap:'3rem'
          }}
        >
          <li className="flex">
            <InfoField text="GlyphDetail" label="For Humans" />
          </li>
          <li className="flex">
            <InfoField text="GlyphDetail" label="Transaction Hash" />
          </li>
          <li className="flex">
            <InfoField text="GlyphDetail" label="Value" />
          </li>
          <li className="flex">
            <InfoField text="GlyphDetail" label="Activity Details" />
          </li>
          <li className="flex">
            <InfoField text="GlyphDetail" label="Date & Time" />
          </li>
          <li className="flex">
            <InfoField text="GlyphDetail" label="Ether Price" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GlyphDetail;
