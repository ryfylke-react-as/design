import { Button } from "./components/Button";
import { TextInput } from "./components/TextInput";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--s-10)",
        gap: "var(--s-01)",
      }}
    >
      <TextInput placeholder="Your email" />
      <Button kind="primary" size="field">
        Subscribe
      </Button>{" "}
    </div>
  );
}

export default App;
