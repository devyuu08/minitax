"use client";

import Link from "next/link";
import styled, { keyframes } from "styled-components";

const gradientFlow = keyframes`
  from {
    background-position: 0% center;
  }
  to {
    background-position: 200% center;
  }
`;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 2rem;
  background-color: transparent;
`;

const StyledLink = styled.a`
  text-decoration: none;
`;

const AnimatedText = styled.span`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #2563eb, #7e22ce, #2563eb);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: ${gradientFlow} 4s linear infinite;

  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.08);
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Link href="/" passHref>
        <StyledLink>
          <AnimatedText>MiniTax</AnimatedText>
        </StyledLink>
      </Link>
    </HeaderWrapper>
  );
}
