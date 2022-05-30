import { useState } from "react";
import { Check } from "@material-ui/icons";
import { Header } from "../components/Header";
import { FormGroup } from "../components/FormGroup";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import { toast } from "../components/ToastProvider";
import { selectOpts } from "../demo.constants";
import { DemoContainer, HorizontalDivide } from "../demo.styles";

export function SelectDemo() {
  const [selectVal, setSelectVal] = useState("");

  const selectInvalid = ["", "no"].includes(selectVal)
    ? ""
    : "Latency too high! (180ms+)";
  return (
    <DemoContainer>
      <Header order={2}>Select</Header>
      <HorizontalDivide
        style={{
          background: "var(--c-ui-01)",
        }}
      >
        <FormGroup invalid={selectInvalid}>
          <Select
            value={selectVal}
            onChange={setSelectVal}
            label="Closest server"
            inverted
            placeholder="No server selected"
            invalid={selectInvalid}
            options={selectOpts}
          />
          <Button
            onClick={() => {
              setSelectVal("");
              toast({
                kind: "success",
                text: "Connected",
                icon: <Check />,
              });
            }}
            size="field"
            kind="primary"
          >
            Connect
          </Button>
        </FormGroup>
      </HorizontalDivide>
      <hr />
      <FormGroup
        invalid={
          ["", "no"].includes(selectVal)
            ? ""
            : "Latency too high! (180ms+)"
        }
      >
        <Select
          value={selectVal}
          onChange={setSelectVal}
          label="Closest server"
          placeholder="No server selected"
          invalid={
            ["", "no"].includes(selectVal)
              ? ""
              : "Latency too high! (180ms+)"
          }
          options={selectOpts}
        />
        <Button
          onClick={() => {
            setSelectVal("");
            toast({
              kind: "success",
              text: "Connected",
              icon: <Check />,
            });
          }}
          size="field"
          kind="primary"
        >
          Connect
        </Button>
      </FormGroup>
    </DemoContainer>
  );
}
