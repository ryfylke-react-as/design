import { useState } from "react";
import { Check } from "@material-ui/icons";
import { Header } from "../components/Header";
import { FormGroup } from "../components/FormGroup";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import { toast } from "../components/ToastProvider";
import { selectOpts } from "../demo.constants";
import { DemoContainer, ComponentBox } from "../demo.styles";

export function SelectDemo() {
  const [selectVal, setSelectVal] = useState("");
  const [select2Val, setSelect2Val] = useState("");

  const selectInvalid = ["", "no"].includes(selectVal)
    ? ""
    : "Latency too high! (180ms+)";
  return (
    <DemoContainer>
      <Header order={1}>Select</Header>
      <ComponentBox
        style={{
          background: "var(--c-ui-bg)",
          border: "1px solid var(--c-ui-01)",
        }}
      >
        <FormGroup>
          <Select
            value={select2Val}
            onChange={setSelect2Val}
            label="Pick favourite"
            placeholder="No favourite selected"
            options={selectOpts}
          />
          <Button
            onClick={() => {
              setSelect2Val("");
            }}
            size="field"
          >
            Reset
          </Button>
        </FormGroup>
      </ComponentBox>
      <hr />
      <ComponentBox>
        <FormGroup invalid={selectInvalid}>
          <Select
            value={selectVal}
            onChange={setSelectVal}
            label="Server"
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
          >
            Connect
          </Button>
        </FormGroup>
      </ComponentBox>
    </DemoContainer>
  );
}
