import { List } from "@material-ui/icons";
import { ReactNode, useState } from "react";
import styled from "styled-components";
import { applyFontKind } from "../styled-utils";
import { Button } from "./Button";
import { Header } from "./Header";

type NavigationItem = {
  to: string;
  text: string;
  icon?: ReactNode;
  children?: NavigationItem[];
};

type ShellProps = {
  topMenu?: {
    title?: ReactNode;
    logo?: ReactNode;
    navigation?: NavigationItem[];
    onSearchChange?: (que: string) => void;
    onSearch?: (que: string) => void;
    actions?: ReactNode[];
  };
  sideMenu?: {
    navigation: NavigationItem[];
  };
  userMenu?: ReactNode[];
  children: ReactNode;
};

export function Shell({
  topMenu,
  sideMenu,
  userMenu,
  children,
}: ShellProps) {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  return (
    <Container>
      {topMenu ? (
        <>
          <TopMenuFiller />
          <TopMenuContainer>
            {sideMenu ? (
              <Button
                icon={<List />}
                size="sm"
                kind="ghost"
                hideFocus
                style={{
                  color: "var(--c-text-04)",
                }}
                onClick={() => setSideMenuOpen(!sideMenuOpen)}
              />
            ) : (
              ""
            )}
            {topMenu.title ? (
              <Header order={4} as="h1">
                {topMenu.title}
              </Header>
            ) : (
              ""
            )}
            <TopMenuRightSide>
              {topMenu.actions ?? ""}
            </TopMenuRightSide>
          </TopMenuContainer>
        </>
      ) : (
        ""
      )}
      <MainSplit>
        {sideMenu ? (
          <>
            <SideMenuFill open={sideMenuOpen} />
            <SideMenuContainer open={sideMenuOpen}>
              {sideMenu.navigation.map((item) => "")}
            </SideMenuContainer>
          </>
        ) : (
          ""
        )}
        <Main>{children}</Main>
      </MainSplit>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopMenuContainer = styled.div`
  display: flex;
  background: var(--c-ui-04);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  height: 42px;
  gap: var(--s-03);
  align-items: center;
  padding: var(--s-03);
  color: var(--c-text-04);
  label {
    color: var(--c-text-04);
  }
  .ryfre--button-ghost {
    color: var(--c-text-04);
  }
  h1 {
    ${applyFontKind("button")}
    padding: var(--s-02);
    color: var(--c-text-04);
  }
`;

const TopMenuRightSide = styled.div`
  margin-left: auto;
`;

const SideMenuContainer = styled.div<{
  open?: boolean;
}>`
  transition: transform 0.3s var(--ease-01),
    opacity 0.2s var(--ease-01);
  width: 220px;
  transform: ${(props) =>
    props.open ? "scaleX(1)" : "scaleX(0)"};
  opacity: ${(props) => (props.open ? "1" : "0")};
  animation-fill-mode: both;
  background: var(--c-ui-01);
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  top: 42px;
  transform-origin: left;
`;

const SideMenuFill = styled.div<{
  open?: boolean;
}>`
  width: ${(props) => (props.open ? "220px" : "0px")};
  transition: width 0.3s var(--ease-01);
  animation-fill-mode: both;
  flex-grow: 0;
  flex-shrink: 0;
`;

const TopMenuFiller = styled.div`
  height: 42px;
  align-items: center;
`;

const Main = styled.main`
  width: 100%;
  flex-grow: 1;
`;

const MainSplit = styled.div`
  display: flex;
`;
