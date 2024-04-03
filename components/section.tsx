"use client";
import React from 'react';
import styled from 'styled-components';

interface SectionProps {
  index: number;
  text: string;
  title: string;
}

const Section: React.FC<SectionProps> = ({ index, text, title }:{index:number, text:string, title:string}) => {
    return (
        <Container index={index}>
        <Title index={index}>{title}</Title>
        <p>{text}</p>
        </Container>
    );
};

interface ContainerProps {
  index: number;
}

const Container = styled.div<ContainerProps>`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: ${props => props.index % 2 === 0 ? 'flex-start' : 'flex-end'};
    padding-left: ${props => props.index % 2 === 0 ? '5%' : '35%'};
    padding-right: ${props => props.index % 2 === 0 ? '35%' : '5%'};
`;

interface TitleProps {
  index: number;
}

const Title = styled.h2<TitleProps>`
    text-align: ${props => props.index % 2 === 0 ? 'left' : 'right'};
    font-size: 6rem ;
`;

export default Section;