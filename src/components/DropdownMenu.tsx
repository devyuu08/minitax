import Styles from "./DropdownMenu.module.css";
import { Calculator, FileText, Home, Info } from "lucide-react";
import Link from "next/link";

export default function DropdownMenu() {
  return (
    <section
      className={Styles.menuContainer}
      role="menu"
      aria-label="플로팅 내비게이션"
    >
      <div>
        <Link href="/">
          <Home size={20} />홈
        </Link>
        <Link href="/about">
          <Info size={20} />
          서비스 소개
        </Link>
        <Link href="/calculator">
          <Calculator size={20} />
          세금 계산기
        </Link>
        <Link href="/policy">
          <FileText size={20} />
          이용 안내
        </Link>
      </div>
    </section>
  );
}
