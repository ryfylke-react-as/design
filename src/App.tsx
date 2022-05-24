import { CSSProperties, useState } from "react";
import { Button } from "./components/Button";
import { FormGroup } from "./components/FormGroup";
import { TextInput } from "./components/TextInput";
import { Typography } from "./components/Typography";

function App() {
  const [roundness, setRoundness] = useState(3);
  return (
    <div
      style={
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "var(--s-10)",
          gap: "var(--s-01)",
          "--roundness": `${roundness}px`,
        } as CSSProperties
      }
    >
      <FormGroup label="Roundness">
        <input
          type="range"
          value={roundness}
          min={0}
          max={20}
          onChange={(e) =>
            setRoundness(parseFloat(e.target.value))
          }
        />
      </FormGroup>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--s-03)",
        }}
      >
        <Typography as="h1" kind="h1">
          Header 1
        </Typography>
        <Typography as="h2" kind="h2">
          Header 2
        </Typography>
        <Typography as="h3" kind="h3">
          Header 3
        </Typography>
        <Typography as="strong" kind="sub">
          Subtitle
        </Typography>
        <Typography as="p" kind="p">
          Paragraph
        </Typography>
        <Typography as="p" kind="label">
          Label
        </Typography>
        <Typography as="p" kind="code">
          Code {"{ }"}
        </Typography>
        <Typography as="p" kind="button">
          Button
        </Typography>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "var(--s-01)",
        }}
      >
        <TextInput placeholder="Your email" label="Your email" />
        <Button kind="primary" size="field">
          Subscribe
        </Button>{" "}
      </div>
    </div>
  );
}

export default App;
