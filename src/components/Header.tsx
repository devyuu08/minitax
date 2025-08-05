"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

/**
 * Header
 * - 고정 상단 내비게이션 헤더 컴포넌트
 * - 홈으로 이동하는 로고 텍스트 포함
 * - 애니메이션 효과가 적용된 브랜드 텍스트 표시
 */

const gradientFlow = keyframes`
  // 로고 텍스트의 그라디언트 배경 이동 애니메이션
  from {
    background-position: 0% center;
  }
  to {
    background-position: 200% center;
  }
`;

const HeaderWrapper = styled.header.attrs<{ $scrolled: boolean }>((props) => ({
  style: {
    backgroundColor: props.$scrolled ? "#ffffff" : "transparent",
    boxShadow: props.$scrolled ? "0 2px 8px rgba(0, 0, 0, 0.06)" : "none",
  },
}))`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 2rem;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const StyledLink = styled(Link)`
  // Next.js Link에 기본 텍스트 스타일 제거
  text-decoration: none;
`;

const AnimatedText = styled.span`
  // MiniTax 브랜드 텍스트 스타일
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;

  // 텍스트에 그라디언트 애니메이션 적용
  background: linear-gradient(90deg, #2563eb, #7e22ce, #2563eb);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: ${gradientFlow} 4s linear infinite;

  // 호버 시 살짝 확대 효과
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.08);
  }

  // 반응형 폰트 사이즈 조정
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 420px) {
    font-size: 1.1rem;
  }
`;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <HeaderWrapper $scrolled={isScrolled}>
      <StyledLink href="/">
        <AnimatedText>MiniTax</AnimatedText>
      </StyledLink>
    </HeaderWrapper>
  );
}
