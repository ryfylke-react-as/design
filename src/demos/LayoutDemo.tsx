import styled from "styled-components";
import { Header } from "../components/Header";

export function LayoutDemo() {
  return (
    <div>
      <Box
        style={{
          border: "1px solid var(--c-ui-01)",
        }}
      >
        <Header order={3}>Level 1</Header>
        <Box
          style={{
            background: "var(--c-ui-01)",
          }}
        >
          <Header order={3}>Level 2</Header>
          <Box
            style={{
              background: "var(--c-ui-02)",
            }}
          >
            <Header order={3}>Level 3</Header>
            <Box
              style={{
                background: "var(--c-ui-03)",
              }}
            >
              <Header order={3}>Level 4</Header>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

const Box = styled.div`
  min-height: 200px;
  padding: var(--s-05);
  h3 {
    margin-bottom: var(--s-05);
  }
`;
