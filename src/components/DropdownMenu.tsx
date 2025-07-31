import Styles from "./DropdownMenu.module.css";
import { Calculator, FileText, Home, Info } from "lucide-react";
import Link from "next/link";

/**
 * DropdownMenu
 * - 플로팅 버튼 클릭 시 나타나는 내비게이션 메뉴
 * - 주요 페이지로 이동 가능한 링크 제공
 * - aria 속성으로 접근성 개선 (role="menu", aria-label)
 */

export default function DropdownMenu() {
  return (
    <section
      className={Styles.menuContainer}
      role="menu"
      aria-label="플로팅 내비게이션"
    >
      <div>
        {/* 홈 링크 */}
        <Link href="/">
          <Home size={20} />홈
        </Link>

        {/* 서비스 소개 링크 */}
        <Link href="/about">
          <Info size={20} />
          서비스 소개
        </Link>

        {/* 세금 계산기 링크 */}
        <Link href="/calculator">
          <Calculator size={20} />
          세금 계산기
        </Link>

        {/* 이용 안내 및 고지사항 링크 */}
        <Link href="/policy">
          <FileText size={20} />
          이용 안내
        </Link>
      </div>
    </section>
  );
}
