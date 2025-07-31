import {
  BadgePercent,
  Bot,
  Briefcase,
  Calculator,
  Heart,
  Lightbulb,
  ShieldCheck,
  Store,
  UserPlus,
} from "lucide-react";
import styles from "./page.module.css";
import Link from "next/link";

export const metadata = {
  title: "MiniTax – 서비스 소개",
  description:
    "MiniTax는 프리랜서 및 개인사업자를 위한 종합소득세 계산기 웹앱입니다. 세금 이해를 돕기 위한 UX 중심의 AI 설명 기능을 제공합니다.",
};

export default function Page() {
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>MiniTax란?</h1>
        <div />
      </section>

      <section>
        <h2>서비스 목적</h2>
        <p>
          Mini Tax는 복잡한 세법으로 인해 어려움을 겪는 프리랜서와 개인사업자를
          위해 개발된 세금 계산 서비스입니다.
        </p>
        <p>
          전문적인 세무 지식이 없어도 누구나 쉽게 세금을 계산하고, 절세 방법을
          찾을 수 있도록 돕는 것이 우리의 목표입니다.
        </p>
        <p>
          세무사를 찾기 전에 미리 예상 세금을 알아보고, 신고 준비를 체계적으로
          할 수 있도록 지원합니다.
        </p>
      </section>

      <div className={styles.divider} />

      <section>
        <h2>이런 분들을 위해 만들었어요</h2>

        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.freelancer}`}>
            <div className={`${styles.iconBox}`}>
              <Briefcase color="#4f46e5" />
            </div>
            <h3>프리랜서</h3>
            <p>
              다양한 클라이언트로부터 받는 수입에 대한 세금 계산이 복잡하고
              어려운 분들
            </p>
          </div>

          <div className={`${styles.card} ${styles.business}`}>
            <div className={`${styles.iconBox}`}>
              <Store color="#059669" />
            </div>
            <h3>개인사업자</h3>
            <p>
              사업 소득과 필요경비를 정리하여 종합소득세를 미리 계산해보고 싶은
              분들
            </p>
          </div>

          <div className={`${styles.card} ${styles.beginner}`}>
            <div className={`${styles.iconBox}`}>
              <UserPlus color="#8b5cf6" />
            </div>
            <h3>초보 사업자</h3>
            <p>처음 사업을 시작하여 세금 신고 과정이 낯설고 부담스러운 분들</p>
          </div>

          <div className={`${styles.card} ${styles.taxSaver}`}>
            <div className={`${styles.iconBox}`}>
              <Lightbulb color="#f97316" />
            </div>
            <h3>절세 관심자</h3>
            <p>
              실생활에 적용 가능한 절세 전략을 찾고 있으며, 세금 최적화에 관심이
              많은 분들
            </p>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section>
        <h2>주요 제공 기능</h2>
        <div className={styles.featureItem}>
          <div className={`${styles.iconBox} ${styles.blue}`}>
            <Calculator color="#4f46e5" />
          </div>
          <div className={styles.textBox}>
            <h3>간편한 세금 계산</h3>
            <p>
              연소득과 필요경비만 입력하면 종합소득세, 지방소득세를 자동으로
              계산합니다.
            </p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={`${styles.iconBox} ${styles.blue}`}>
            <Bot color="#059669" />
          </div>
          <div className={styles.textBox}>
            <h3>AI 기반 친절한 설명</h3>
            <p>
              이해하기 어려운 세법 계산 과정을 AI가 쉬운 말로 설명해드립니다. 왜
              이런 세금이 나왔는지를 쉽게 확인할 수 있습니다.
            </p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={`${styles.iconBox} ${styles.blue}`}>
            <BadgePercent color="#8b5cf6" />
          </div>
          <div className={styles.textBox}>
            <h3> 맞춤형 절세 가이드</h3>
            <p>
              개인의 소득에 맞는 절세 전략과 공제 혜택을 제안합니다. 놓치기 쉬운
              공제 항목들과 신고 시 주의사항도 함께 안내합니다.
            </p>
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={`${styles.iconBox} ${styles.blue}`}>
            <ShieldCheck color="#f53325ff" />
          </div>
          <div className={styles.textBox}>
            <h3>신뢰할 수 있는 계산</h3>
            <p>
              국세청 공식 세율표와 공제 기준을 바탕으로 정확한 계산을
              제공합니다. 실제 신고할 때와 동일한 기준으로 세금을 미리 예측할 수
              있습니다.
            </p>
          </div>
        </div>
      </section>

      <div className={styles.divider} />

      <section className={styles.promiseSection}>
        <div className={styles.promiseContent}>
          <div className={`${styles.iconBox} ${styles.purple}`}>
            <Heart color="#f4f4f9ff" />
          </div>
          <h2>우리의 약속</h2>
          <p>
            MiniTax는 복잡한 세법을 누구나 이해할 수 있도록 만드는 것이
            사명입니다.
            <br /> 세금 때문에 스트레스받지 않고, 본업에 집중할 수 있는 환경을
            만들어가겠습니다.
          </p>
        </div>
        <Link href="/policy" className={styles.policy_Btn}>
          이용 안내 및 주의사항 확인하기
        </Link>
      </section>
    </div>
  );
}
