"use client";
import React, { ReactNode, useState, useEffect } from "react";
import styled from 'styled-components';
import { ImMenu } from "react-icons/im";
export default function NavBar({ children }: { children: ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let timeoutId: string | number | NodeJS.Timeout | null | undefined = null;

  useEffect(() => {
    const handleMouseMove = () => {
      setIsVisible(true);
      if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
      timeoutId = setTimeout(() => setIsVisible(false), 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Container>
      <Button $isVisible={isVisible}
        className={isHovered ? "hovered" : ""}
        onMouseEnter={() => setIsHovered(true)}
      ><ImMenu size={28} color={isHovered? "#4D956D":"#FCFBE4"}/></Button>
      <Main
        className={isHovered ? "hovered" : ""}
        onMouseEnter={() => setIsHovered(false)}
      >
        {children}
      </Main>
      <VerticalMenu
        onMouseEnter={() => setIsHovered(true)}
      ></VerticalMenu>
      <HorizontalMenu
        onMouseEnter={() => setIsHovered(true)}
      ></HorizontalMenu>
    </Container>
  );
}
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;  
    height: 100vh;
    background-color: #D58C44;
`;

const Main = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #FCFBE4;
    transition: transform 0.5s;
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: none;
    overflow: auto;
    transition: all ease-in-out 0.5s;
    &.hovered {
        transform: translate(-10%, -10%);
        border-bottom-right-radius: 100px;
        box-shadow: 25px 25px 20px rgba(0, 0, 0, 0.5);
        transition: all ease-in-out 0.5s;
    }
`;

const VerticalMenu = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 10%;
    height: 100%;
    background-color: #D58C44;
    z-index: 1;
`;

const HorizontalMenu = styled.div`
    position: fixed;
    bottom: 0;
    left:0;
    width: 90%;
    height: 10%;
    background-color: #D58C44;
    z-index: 1;
`;

const Button = styled.button<{ $isVisible: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 10vh;
    right: 10vh;
    width: 10vh;
    height: 10vh;
    border-radius: 100%;
    background-color: #4D956D ;
    z-index: 100;
    transition: all ease-in-out 0.5s;
    opacity: ${(props: { $isVisible: boolean }) => (props.$isVisible ? 0.5 : 0)};

    &:hover {
        transition: all ease-in-out 0.5s;
        background-color: #FCFBE4;
    }

    &.hovered {
        opacity: 0.2;
    }
`;
