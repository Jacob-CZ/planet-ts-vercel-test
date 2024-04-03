"use client";
import React, { ReactNode, useState } from "react";
import styled from 'styled-components';


export default function NavBar({ children }: { children: ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container>
      <Button
        className={isHovered ? "hovered" : ""}
        onMouseEnter={() => setIsHovered(true)}
      ></Button>
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
    background-color: lightblue;
`;

const Main = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: lightgreen;
    transition: transform 0.5s;
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: 25px 25px 20px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    transition: all ease-in-out 0.5s;
    &.hovered {
        transform: translate(-10%, -10%);
        border-bottom-right-radius: 100px;
        transition: all ease-in-out 0.5s;
    }
`;

const VerticalMenu = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 10%;
    height: 100%;
    background-color: lightblue;
    z-index: 1;
`;

const HorizontalMenu = styled.div`
    position: fixed;
    bottom: 0;
    left:0;
    width: 90%;
    height: 10%;
    background-color: lightblue;
    z-index: 1;
`;

const Button = styled.button`
    position: fixed;
    top: 10vh;
    right: 10vh;
    width: 10vh;
    height: 10vh;
    border-radius: 100%;
    background-color: #21420d90;
    z-index: 100;
    transition: all ease-in-out 0.5s;

    &:hover {
        background-color: red;
    }

    &.hovered {
        opacity: 0.2;
    }
`;
