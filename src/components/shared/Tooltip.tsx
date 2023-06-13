import {
  Tooltip as MaterialToopTip,
  Tooltip,
  TooltipProps,
} from "@mui/material";

const ToolTipText = ({
  text,
  children,
  placement,
}: {
  text: string;
  children: JSX.Element;
  placement: TooltipProps["placement"];
}) => {
  const Text = ({ text }: { text: string }) => {
    return (
      <span style={{ fontSize: "1.4rem", fontFamily: "DINAlternateBold" }}>
        {text}
      </span>
    );
  };
  return (
    <MaterialToopTip placement={placement} title={<Text text={text} />}>
      {children}
    </MaterialToopTip>
  );
};

export default ToolTipText;
