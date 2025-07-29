"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Menu, X } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

const FloatingMenuContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  z-index: 1000;

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
  }

  @media (max-width: 420px) {
    bottom: 1rem;
    right: 1rem;
    gap: 0.5rem;
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
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

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 420px) {
    width: 44px;
    height: 44px;
  }
`;

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫힘 처리
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FloatingMenuContainer ref={menuRef}>
      {isOpen && <DropdownMenu />}

      <FloatingButton onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </FloatingButton>
    </FloatingMenuContainer>
  );
}
