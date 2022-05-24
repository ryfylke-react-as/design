import { CSSProperties, useState } from "react";
import { Button } from "./components/Button";
import { FormGroup } from "./components/FormGroup";
import { TextInput } from "./components/TextInput";
import { Typography } from "./components/Typography";

function App() {
  const [roundness, setRoundness] = useState(3);
  const [rotation, setRotation] = useState(0);
  const [emailVal, setEmailVal] = useState("");
  const emailIsValid =
    emailVal === "" ||
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      emailVal
    );
  return (
    <div
      style={
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "var(--s-10) auto",
          gap: "var(--s-01)",
          transition: "transform 2s ease-in-out",
          transform: `rotate(${rotation}deg)`,
          "--roundness": `${roundness}px`,
          maxWidth: 1000,
        } as CSSProperties
      }
    >
      <FormGroup
        label="Roundness"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
        }}
      >
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
      <Typography
        as="h1"
        kind="h1"
        props={{ style: { margin: "var(--s-05) 0" } }}
      >
        Ryfre components
      </Typography>
      <Typography
        as="h2"
        kind="h2"
        props={{ style: { margin: "var(--s-05) 0" } }}
      >
        Typography
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--s-03)",
          padding: "var(--s-05)",
          background: "var(--c-ui-01)",
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
      <Typography
        as="h2"
        kind="h2"
        props={{ style: { margin: "var(--s-05) 0" } }}
      >
        Button
      </Typography>
      <hr />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "var(--s-03)",
          padding: "var(--s-05)",
          background: "var(--c-ui-01)",
        }}
      >
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
      <div
        style={{
          display: "flex",
          gap: "var(--s-03)",
          padding: "var(--s-05)",
          background: "var(--c-ui-01)",
        }}
      >
        <Button size="sm">Small button</Button>{" "}
        <Button size="field">Field button</Button>{" "}
        <Button size="md">Medium button</Button>{" "}
        <Button
          size="lg"
          kind="primary"
          onClick={() => setRotation(0)}
        >
          Large (primary) button
        </Button>{" "}
      </div>
      <Typography
        as="h2"
        kind="h2"
        props={{ style: { margin: "var(--s-05) 0" } }}
      >
        TextInput
      </Typography>
      <div
        style={{
          display: "flex",
          gap: "var(--s-04)",
          flexDirection: "column",
          padding: "var(--s-05)",
        }}
      >
        <TextInput placeholder="John Smith" label="Text input" />
        <TextInput
          placeholder="john-smith@gmail.com"
          label="Email (with validation)"
          value={emailVal}
          onChange={(e) => setEmailVal(e.target.value)}
          invalid={
            emailIsValid ? "" : "Please enter valid email"
          }
        />
        <TextInput
          placeholder="*************"
          label="Password"
          type="password"
        />
      </div>
    </div>
  );
}

export default App;
