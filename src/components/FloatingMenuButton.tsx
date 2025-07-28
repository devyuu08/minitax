"use client";

import { useState } from "react";
import styled from "styled-components";
import { Menu, X } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1001;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #2563eb;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  transition: background 0.3s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export default function FloatingMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <FloatingButton onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </FloatingButton>

      <DropdownMenu />
    </>
  );
}
