import { ArrowRightAlt } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "../Button";

type NavigateButtonProps = ButtonProps & {
  to: string;
};

export function NavigateButton({
  to,
  ...rest
}: NavigateButtonProps) {
  const navigate = useNavigate();
  return (
    <Button
      size="lg"
      kind="ghost"
      ripple
      icon={<ArrowRightAlt />}
      onClick={() => navigate(to)}
      {...rest}
    />
  );
}
