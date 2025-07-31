import {
  AlertCircle,
  AlertTriangle,
  Bot,
  Calculator,
  Check,
  Lightbulb,
  LockKeyholeIcon,
  ShieldCheck,
  ShieldUser,
} from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MiniTax – 이용 안내 및 고지사항",
  description:
    "MiniTax의 서비스 이용 시 주의사항, AI 설명 기능의 안내, 그리고 책임의 범위에 대해 안내합니다.",
  openGraph: {
    title: "MiniTax – 이용 안내 및 고지사항",
    description:
      "MiniTax의 서비스 이용 시 주의사항, AI 설명 기능의 안내, 그리고 책임의 범위에 대해 안내합니다.",
    images: ["/thumbnail.png"],
    siteName: "MiniTax",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiniTax – 종합소득세 계산기",
    description: "AI가 쉽고 빠르게 설명해주는 프리랜서 전용 세금 계산기",
    images: ["/thumbnail.png"],
  },
};

export default function Page() {
  return (
    <div className={styles.container}>
      <section className={styles.title} aria-labelledby="pageTitle">
        <h1 id="pageTitle">이용 안내 및 AI 설명 고지</h1>
        <div />
      </section>

      <section>
        <div
          className={`${styles.card} ${styles.notice}`}
          role="region"
          aria-labelledby="noticeTitle"
        >
          <div className={`${styles.iconBox}`}>
            <AlertTriangle color="#D97706" aria-hidden="true" />
          </div>
          <div className={styles.textBox}>
            <h2 id="noticeTitle">중요 안내사항</h2>
            <p>
              MiniTax 서비스를 이용하기 전에 반드시 아래 내용을 확인해주세요.
            </p>
          </div>
        </div>

        <div
          className={`${styles.card} ${styles.ai}`}
          role="region"
          aria-labelledby="aiNoticeTitle"
        >
          <div className={`${styles.iconBox}`}>
            <Bot color="#2563EB" aria-hidden="true" />
          </div>
          <div className={styles.textBox}>
            <h2 id="aiNoticeTitle">AI 설명에 대한 고지사항</h2>
            <p>
              MiniTax에서 제공하는 GPT 기반 AI 설명은{" "}
              <strong>참고용 정보</strong>
              로만 활용해주시기 바랍니다.
            </p>
            <p>
              AI가 제공하는 세무 관련 설명과 조언은{" "}
              <strong>실제 세무 상담을 대체할 수 없으며,</strong> 개인의
              구체적인 상황에 따라 다를 수 있습니다.
            </p>
            <p>
              정확한 세무 상담이 필요한 경우, 반드시{" "}
              <strong>세무 전문가 또는 세무사</strong>와 상담하시기 바랍니다.
            </p>
            <div>
              <AlertCircle color="#1E40AF" /> AI 설명은 일반적인 세법 정보를
              바탕으로 생성되며, 최신 세법 개정사항이 반영되지 않을 수 있습니다.
            </div>
          </div>
        </div>

        <div
          className={`${styles.card} ${styles.accuracy}`}
          role="region"
          aria-labelledby="accuracyTitle"
        >
          <div className={`${styles.iconBox}`}>
            <Calculator color="#16A34A" aria-hidden="true" />
          </div>
          <div className={styles.textBox}>
            <h2 id="accuracyTitle">계산 결과의 정확성</h2>
            <p>
              MiniTax의 세금 계산 결과는 <strong>예상 금액</strong>이며, 실제
              신고 시 사용할 정확한 세액과 다를 수 있습니다.
            </p>
            <p>
              정확한 세금 신고를 위해서는 반드시{" "}
              <strong>국세청 홈택스 또는 세무 전문가</strong>의 도움을 받아
              신고하시기 바랍니다.
            </p>
            <p>
              개인의 상황(부양가족, 특별공제, 기타소득 등)에 따라 실제 세액은
              계산 결과와 차이가 날 수 있습니다.
            </p>
            <div>
              <ShieldCheck color="#166534" aria-hidden="true" /> AI 설명은
              일반적인 세법 정보를 바탕으로 생성되며, 최신 세법 개정사항이
              반영되지 않을 수 있습니다.
            </div>
          </div>
        </div>

        <div
          className={`${styles.card} ${styles.privacy}`}
          role="region"
          aria-labelledby="privacyTitle"
        >
          <div className={`${styles.iconBox}`}>
            <ShieldUser color="#9333EA" aria-hidden="true" />
          </div>
          <div className={styles.textBox}>
            <h2 id="privacyTitle">개인정보 보호</h2>
            <p>
              MiniTax에서 입력하신{" "}
              <strong>모든 정보는 저장되지 않습니다.</strong>
            </p>
            <p>
              연소득, 필요경비 등 입력한 데이터는 계산 목적으로만{" "}
              <strong>일시적으로 처리</strong>되며, 계산이 완료되면 즉시
              삭제됩니다.
            </p>
            <p>
              서버나 데이터베이스에 개인의 소득정보가{" "}
              <strong>보관되지 않으므로,</strong> 안심하고 이용하실 수 있습니다.
            </p>
            <div>
              <LockKeyholeIcon color="#6B21A8" aria-hidden="true" /> 귀하의
              개인정보와 소득정보는 철저히 보호되며, 외부로 유출되지 않습니다.
            </div>
          </div>
        </div>

        <div
          className={`${styles.card} ${styles.guide}`}
          role="region"
          aria-labelledby="guideTitle"
        >
          <div className={`${styles.iconBox}`}>
            <Lightbulb color="#4B5563" aria-hidden="true" />
          </div>
          <div className={styles.textBox}>
            <h2 id="guideTitle">권장 이용 방법</h2>
            <ul className={styles.numberList}>
              <li>
                <span>1.</span>세금 신고 전 &nbsp;
                <strong>예상 세액을 미리 확인</strong>하는 용도로 활용하세요.
              </li>
              <li>
                <span>2.</span>계산 결과를 바탕으로 &nbsp;
                <strong>신고 준비와 자금 계획</strong>을 세워보세요.
              </li>
              <li>
                <span>3.</span>복잡한 경우나 정확한 신고가 필요할 때는 &nbsp;
                <strong>세무 전문가와 상담</strong>하세요.
              </li>
              <li>
                <span>4.</span>AI 설명을 통해 &nbsp;
                <strong>세법에 대한 기본 이해</strong>를 높여보세요.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        className={styles.agreementSection}
        role="region"
        aria-labelledby="agreementTitle"
      >
        <div className={styles.agreementContent}>
          <div className={`${styles.iconBox} ${styles.purple}`}>
            <Check color="#f4f4f9ff" aria-hidden="true" />
          </div>
          <h2 id="agreementTitle">서비스 이용 동의</h2>
          <p>
            MiniTax 서비스를 이용함으로써 위의 모든 안내사항을 이해하고 동의한
            것으로 간주됩니다.
            <br /> 안전하고 현명한 세금 관리를 위해 항상 신중하게 이용해주세요.
          </p>
        </div>
        <Link
          href="/about"
          className={styles.about_Btn}
          role="button"
          aria-label="서비스 소개 페이지로 이동"
        >
          서비스 소개 보기
        </Link>
      </section>
    </div>
  );
}
