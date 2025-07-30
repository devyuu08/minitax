"use client";

import Link from "next/link";
import styles from "./not-found.module.css";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/images/404-illustration.png"
        alt="404 페이지 이미지"
        width={300}
        height={200}
        priority
      />
      <h1 className={styles.title}>앗! 페이지를 찾을 수 없어요</h1>
      <p className={styles.description}>
        입력하신 주소가 잘못되었거나, 페이지가 삭제되었을 수 있어요.
      </p>
      <Link href="/" className={styles.button}>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
