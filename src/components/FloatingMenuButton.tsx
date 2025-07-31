"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Menu, X } from "lucide-react";
import DropdownMenu from "./DropdownMenu";

/**
 * FloatingMenu
 * - 우측 하단에 고정된 플로팅 버튼을 제공
 * - 버튼 클릭 시 DropdownMenu가 토글되며, 외부 클릭 시 자동 닫힘 처리됨
 * - 모바일 환경에서도 위치와 크기 대응
 */

// 플로팅 메뉴 전체 컨테이너 (버튼 + 드롭다운 포함)
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

// 메인 플로팅 버튼 스타일
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
  const [isOpen, setIsOpen] = useState(false); // 메뉴 열림 상태
  const menuRef = useRef<HTMLDivElement>(null); // 외부 클릭 감지용 ref

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
      {/* 메뉴가 열려 있을 때만 드롭다운 표시 */}
      {isOpen && <DropdownMenu />}

      {/* 플로팅 버튼 클릭 시 메뉴 토글 */}
      <FloatingButton onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </FloatingButton>
    </FloatingMenuContainer>
  );
}
