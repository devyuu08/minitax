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

export default function Page() {
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <h1>이용 안내 및 AI 설명 고지</h1>
        <div />
      </section>

      <section>
        <div className={styles.cardGrid}>
          <div className={`${styles.card} ${styles.freelancer}`}>
            <div className={`${styles.iconBox}`}>
              <AlertTriangle color="#4f46e5" />
            </div>
            <h2>중요 안내사항</h2>
            <p>
              MiniTax 서비스를 이용하기 전에 반드시 아래 내용을 확인해주세요.
            </p>
          </div>

          <div className={`${styles.card} ${styles.business}`}>
            <div className={`${styles.iconBox}`}>
              <Bot color="#4f46e5" />
            </div>
            <h2>AI 설명에 대한 고지사항</h2>
            <p>
              MiniTax에서 제공하는 GPT 기반 AI 설명은{" "}
              <strong>참고용 정보</strong>로만 활용해주시기 바랍니다.
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
              <AlertCircle color="#4f46e5" /> AI 설명은 일반적인 세법 정보를
              바탕으로 생성되며, 최신 세법 개정사항이 반영되지 않을 수 있습니다.
            </div>
          </div>

          <div className={`${styles.card} ${styles.beginner}`}>
            <div className={`${styles.iconBox}`}>
              <Calculator color="#8b5cf6" />
            </div>
            <h2>계산 결과의 정확성</h2>
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
              <ShieldCheck color="#059669" /> AI 설명은 일반적인 세법 정보를
              바탕으로 생성되며, 최신 세법 개정사항이 반영되지 않을 수 있습니다.
            </div>
          </div>

          <div className={`${styles.card} ${styles.taxSaver}`}>
            <div className={`${styles.iconBox}`}>
              <ShieldUser color="#f97316" />
            </div>
            <h2>개인정보 보호</h2>
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
              <LockKeyholeIcon color="#4f46e5" /> 귀하의 개인정보와 소득정보는
              철저히 보호되며, 외부로 유출되지 않습니다.
            </div>
          </div>

          <div className={`${styles.card} ${styles.taxSaver}`}>
            <div className={`${styles.iconBox}`}>
              <Lightbulb color="#f97316" />
            </div>
            <h2>권장 이용 방법</h2>
            <ol>
              <li>
                세금 신고 전 <strong>예상 세액을 미리 확인</strong>하는 용도로
                활용하세요.
              </li>
              <li>
                계산 결과를 바탕으로 <strong>신고 준비와 자금 계획</strong>을
                세워보세요.
              </li>
              <li>
                복잡한 경우나 정확한 신고가 필요할 때는{" "}
                <strong>세무 전문가와 상담</strong>하세요.
              </li>
              <li>
                AI 설명을 통해 <strong>세법에 대한 기본 이해</strong>를
                높여보세요.
              </li>
            </ol>
            <div>
              <LockKeyholeIcon color="#4f46e5" /> 귀하의 개인정보와 소득정보는
              철저히 보호되며, 외부로 유출되지 않습니다.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.agreementSection}>
        <div className={styles.agreementContent}>
          <div className={`${styles.iconBox} ${styles.purple}`}>
            <Check color="#f4f4f9ff" />
          </div>
          <h2>서비스 이용 동의</h2>
          <p>
            MiniTax 서비스를 이용함으로써 위의 모든 안내사항을 이해하고 동의한
            것으로 간주됩니다.
            <br /> 안전하고 현명한 세금 관리를 위해 항상 신중하게 이용해주세요.
          </p>
        </div>
        <Link href="/about" className={styles.about_Btn}>
          서비스 소개 보기
        </Link>
      </section>
    </div>
  );
}
