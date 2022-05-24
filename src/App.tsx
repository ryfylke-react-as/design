import { CSSProperties, useState } from "react";
import { Button } from "./components/Button";
import { FormGroup } from "./components/FormGroup";
import { TextInput } from "./components/TextInput";
import { Typography } from "./components/Typography";

function App() {
  const [roundness, setRoundness] = useState(3);
  const [rotation, setRotation] = useState(0);
  return (
    <div
      style={
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "var(--s-10)",
          gap: "var(--s-01)",
          transition: "transform 2s ease-in-out",
          transform: `rotate(${rotation}deg)`,
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
        <Typography
          as="h1"
          kind="h1"
          props={{ contentEditable: true }}
        >
          Header 1
        </Typography>
        <Typography
          as="h2"
          kind="h2"
          props={{ contentEditable: true }}
        >
          Header 2
        </Typography>
        <Typography
          as="h3"
          kind="h3"
          props={{ contentEditable: true }}
        >
          Header 3
        </Typography>
        <Typography
          as="strong"
          kind="sub"
          props={{ contentEditable: true }}
        >
          Subtitle
        </Typography>
        <Typography
          as="p"
          kind="p"
          props={{ contentEditable: true }}
        >
          Paragraph
        </Typography>
        <Typography
          as="p"
          kind="label"
          props={{ contentEditable: true }}
        >
          Label
        </Typography>
        <Typography
          as="p"
          kind="code"
          props={{ contentEditable: true }}
        >
          Code {"{ }"}
        </Typography>
        <Typography
          as="p"
          kind="button"
          props={{ contentEditable: true }}
        >
          Button
        </Typography>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "var(--s-03)",
        }}
      >
        <TextInput
          placeholder="john-smith@gmail.com"
          label="Your email"
        />
        <Button kind="primary" size="field">
          Primary
        </Button>
        <Button
          kind="danger"
          size="field"
          onClick={() => setRotation((p) => p + 6)}
        >
          Danger
        </Button>
        <Button size="field">Regular</Button>{" "}
      </div>
      <hr />
      <div style={{ display: "flex", gap: "var(--s-03)" }}>
        <Button size="sm">Small button</Button>{" "}
        <Button size="field">Field button</Button>{" "}
        <Button size="md">Medium button</Button>{" "}
        <Button size="lg">Large button</Button>{" "}
      </div>
    </div>
  );
}

export default App;
