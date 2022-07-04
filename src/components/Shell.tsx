import React from "react";
import { ArrowDropDown, List } from "@styled-icons/material";
import {
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useControlledState } from "../hooks/useControlledState";
import { useSyncedState } from "../hooks/useSyncedState";
import {
  applyFocusStyles,
  applyFontKind,
} from "../styled-utils";
import { Button } from "./Button";
import { Header } from "./Header";

type NavigationItem = {
  to: string;
  text: string;
  id: string;
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
    background?: string;
  };
  sideMenu?: {
    navigation: NavigationItem[];
    floating?: boolean;
  };
  userMenu?: ReactNode[];
  children: ReactNode;
  defaultOpen?: boolean;
  disableToggleSideMenu?: boolean;
  onSideMenuOpen?: (state: boolean) => void;
  expandedMenuItems?: string[];
  onExpandedMenuItemsChange?: (value: string[]) => void;
  sideMenuOpen?: boolean;
  onSideMenuOpenChange?: (value: boolean | undefined) => void;
};

export function Shell({
  topMenu,
  sideMenu,
  children,
  defaultOpen,
  onSideMenuOpen,
  disableToggleSideMenu,
  expandedMenuItems: propExpandedMenuItems,
  onExpandedMenuItemsChange,
  sideMenuOpen: propSideMenuOpen,
  onSideMenuOpenChange,
}: ShellProps) {
  const location = useLocation();
  const sideMenuRef = useRef<HTMLDivElement>(null);
  const [expandedMenuItems, setExpandedMenuItems] =
    useControlledState<string[]>(
      [],
      propExpandedMenuItems,
      onExpandedMenuItemsChange
    );
  const navigate = useNavigate();
  const [sideMenuOpen, setSideMenuOpen] = useSyncedState({
    initial_value: defaultOpen ?? false,
    controls: {
      value: propSideMenuOpen,
      setValue: onSideMenuOpenChange,
    },
  });

  const toggleMenuItem = (id: string) => {
    setExpandedMenuItems(
      expandedMenuItems.includes(id)
        ? expandedMenuItems.filter((cid) => cid !== id)
        : [...expandedMenuItems, id]
    );
  };

  const navMapper = (
    item: NavigationItem,
    level: number
  ): ReactElement => (
    <>
      <NavMenuItem
        onClick={() => {
          if (item.children) {
            toggleMenuItem(item.id);
          } else {
            navigate(item.to);
          }
        }}
        expanded={expandedMenuItems.includes(item.id)}
        indent={level}
        active={location.pathname === item.to}
      >
        {item.text} {item.children ? <ArrowDropDown /> : ""}
      </NavMenuItem>
      {item.children && expandedMenuItems.includes(item.id) ? (
        <DropdownAnimContainer>
          {item.children.map((item) =>
            navMapper(item, level + 1)
          )}
        </DropdownAnimContainer>
      ) : (
        ""
      )}
    </>
  );

  const clickOutsideListener = useCallback(
    (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (
        !sideMenuRef.current?.contains?.(el) &&
        sideMenuOpen &&
        !el?.classList?.contains?.("ryfrea--nav-button")
      ) {
        setSideMenuOpen(false);
      }
    },
    [sideMenuOpen, setSideMenuOpen]
  );

  useEffect(() => {
    if (sideMenu?.floating && sideMenuOpen) {
      document.body.addEventListener(
        "click",
        clickOutsideListener
      );
    } else {
      document.body.removeEventListener(
        "click",
        clickOutsideListener
      );
    }
    return () => {
      document.body.removeEventListener(
        "click",
        clickOutsideListener
      );
    };
  }, [sideMenu?.floating, clickOutsideListener, sideMenuOpen]);

  return (
    <Container>
      {topMenu ? (
        <>
          <TopMenuFiller />
          <TopMenuContainer background={topMenu?.background}>
            {sideMenu && !disableToggleSideMenu ? (
              <Button
                icon={<List className="ryfrea--nav-button" />}
                size="sm"
                kind="ghost"
                hideFocus
                style={{
                  color: "var(--c-text-04)",
                }}
                onClick={() => {
                  setSideMenuOpen(!sideMenuOpen);
                  onSideMenuOpen?.(!sideMenuOpen);
                }}
                className="ryfrea--nav-button"
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
            {!sideMenu?.floating && (
              <SideMenuFill open={sideMenuOpen} />
            )}
            <SideMenuContainer
              open={sideMenuOpen}
              ref={sideMenuRef}
            >
              {sideMenu.navigation.map((item) =>
                navMapper(item, 0)
              )}
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

const DropdownAnimContainer = styled.div`
  display: flex;
  flex-direction: column;
  transform-origin: top;
`;

const NavMenuItem = styled.button<{
  expanded?: boolean;
  active?: boolean;
  indent?: number;
}>`
  border: none;
  text-align: left;
  ${applyFontKind("small")}
  color: var(--c-text-02);
  background: ${(props) =>
    props.active ? "var(--c-ui-02)" : "transparent"};
  padding: var(--s-03);
  padding-left: ${(props) =>
    `calc(var(--s-06) + calc(var(--s-04) * ${
      props?.indent ?? 0
    }))`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid transparent;
  ${applyFocusStyles(true)}
  &:focus {
    outline-offset: -3px;
  }
  &:focus:not(:focus-visible) {
    position: relative;
  }
  color: ${(props) =>
    props.active ? "var(--c-focus-01)" : "var(--c-text-02)"};
  ${(props) =>
    (props?.indent ?? 0) > 0 &&
    `
    &::before {
      content:"";
      display:block;
      width:1px;
      background:${
        props.active ? "var(--c-focus-01)" : "var(--c-ui-02)"
      };
      position:absolute;
      left:calc(var(--s-06));
      top:1px;
      bottom:0;
    }
  `}
  svg {
    --size: 1.25rem;
    width: var(--size);
    height: var(--size);
    transition: transform 0.15s var(--ease-01);
    transform: ${(props) =>
      props.expanded ? "rotate(180deg)" : "rotate(0deg)"};
  }
  &:hover {
    background: var(--c-ui-02);
    &::before {
      background: ${(props) =>
        props.active ? "var(--c-focus-01)" : "var(--c-ui-03)"};
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopMenuContainer = styled.div<{
  background?: string;
}>`
  display: flex;
  background: ${(props) => props.background ?? "var(--c-ui-04)"};
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
    a {
      color: var(--c-text-04);
      text-decoration: none;
    }
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
  display: flex;
  flex-direction: column;
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
