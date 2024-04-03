// BubbleBackground.tsx

// BubbleBackground.tsx
"use client";
import React from "react";
import styled, { keyframes } from "styled-components";



const BubbleBackground= ({ children }:{children: React.ReactNode}) => {

  return (
      <StyledBubbleBackground>
        <TextContainer>{children}</TextContainer>
        <GradientBg>
          <svg xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="10"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>
          <div className="gradientsContainer">
            <G1 />
            <G2 />
            <G3 />
            <G4 />
            <G5 />
          </div>
        </GradientBg>
      </StyledBubbleBackground>
  );
};

export default BubbleBackground;
const moveInCircle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const moveVertical = keyframes`
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-50%);
  }
`;

const moveHorizontal = keyframes`
  0% {
    transform: translateX(-50%) translateY(-10%);
  }
  50% {
    transform: translateX(50%) translateY(10%);
  }
  100% {
    transform: translateX(-50%) translateY(-10%);
  }
`;

const StyledBubbleBackground = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const TextContainer = styled.div`
  z-index: 100;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  font-size: 96px;
  color: white;
  opacity: 0.8;
  user-select: none;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  overflow-y: auto;
`;

const GradientBg = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(40deg, rgb(108, 0, 162), rgb(0, 17, 82));
  top: 0;
  left: 0;

  svg {
    display: none;
  }

  .gradientsContainer {
    filter: url(#goo) blur(40px);
    width: 100%;
    height: 100%;
  }
`;

const GradientElement = styled.div`
  position: absolute;
  mix-blend-mode: hard-light;
  width: 80%;
  height: 80%;
`;

const G1 = styled(GradientElement)`
  background: radial-gradient(
      circle at center,
      rgba(18, 113, 255, 0.8) 0,
      rgba(18, 113, 255, 0) 50%
    )
    no-repeat;
  animation: ${moveVertical} 30s ease infinite;
  top: calc(50% - 40%);
  left: calc(50% - 40%);
  transform-origin: center center;
`;

const G2 = styled(GradientElement)`
  background: radial-gradient(
      circle at center,
      rgba(221, 74, 255, 0.8) 0,
      rgba(221, 74, 255, 0) 50%
    )
    no-repeat;
  animation: ${moveInCircle} 20s reverse infinite;
  top: calc(50% - 40%);
  left: calc(50% - 40%);
  transform-origin: calc(50% - 400px);
`;

const G3 = styled(GradientElement)`
  background: radial-gradient(
      circle at center,
      rgba(100, 220, 255, 0.8) 0,
      rgba(100, 220, 255, 0) 50%
    )
    no-repeat;
  animation: ${moveInCircle} 40s linear infinite;
  top: calc(50% + 20%);
  left: calc(50% - 50%);
  transform-origin: calc(50% + 400px);
`;

const G4 = styled(GradientElement)`
  background: radial-gradient(
      circle at center,
      rgba(200, 50, 50, 0.8) 0,
      rgba(200, 50, 50, 0) 50%
    )
    no-repeat;
  animation: ${moveHorizontal} 40s ease infinite;
  top: calc(50% - 40%);
  left: calc(50% - 40%);
  transform-origin: calc(50% - 200px);
  opacity: 0.7;
`;

const G5 = styled(GradientElement)`
  background: radial-gradient(
      circle at center,
      rgba(180, 180, 50, 0.8) 0,
      rgba(180, 180, 50, 0) 50%
    )
    no-repeat;
  animation: ${moveInCircle} 20s ease infinite;
  width: 160%;
  height: 160%;
  transform-origin: calc(50% - 800px) calc(50% + 200px);
  top: calc(50% - 80%);
  left: calc(50% - 80%);
`;
