"use client";

import styles from "./not-found.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace("/");
  };

  return (
    <main
      className={styles.wrapper}
      role="main"
      aria-labelledby="notfound-title"
    >
      <Image
        src="/images/404-illustration.png"
        alt="404 페이지 이미지"
        width={300}
        height={200}
        className={styles.image}
        priority
      />
      <h1 id="notfound-title" className={styles.title}>
        앗! 페이지를 찾을 수 없어요
      </h1>
      <p className={styles.description}>
        입력하신 주소가 잘못되었거나, 페이지가 삭제되었을 수 있어요.
      </p>
      <button
        onClick={handleGoHome}
        className={styles.button}
        aria-label="홈 페이지로 이동"
      >
        홈으로 돌아가기
      </button>
    </main>
  );
}
