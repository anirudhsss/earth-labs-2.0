import { Tooltip as MaterialToopTip, Tooltip } from "@mui/material";

const ToolTipText = ({
  text,
  children,
}: {
  text: string;
  children: JSX.Element;
}) => {
  const Text = ({ text }: { text: string }) => {
    return (
      <span style={{ fontSize: "1.6rem", fontFamily: "DINAlternateBold" }}>
        {text}
      </span>
    );
  };
  return (
    <MaterialToopTip title={<Text text={text} />}>{children}</MaterialToopTip>
  );
};

export default ToolTipText;
