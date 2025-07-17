"use client";

import Link from "next/link";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 2rem;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
`;

const Logo = styled(Link)`
  font-size: 1.2rem;
  font-weight: 600;
  color: #111;
  text-decoration: none;

  &:hover {
    color: #2563eb;
  }
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo href="/">MiniTax</Logo>
    </HeaderWrapper>
  );
}
