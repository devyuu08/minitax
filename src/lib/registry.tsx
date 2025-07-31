"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

/**
 * StyledComponentsRegistry
 * - Next.js App Router 환경에서 styled-components의 SSR을 지원하는 래퍼 컴포넌트
 * - ServerStyleSheet를 통해 서버에서 스타일을 수집하고 HTML에 삽입
 */

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // styled-components 서버 스타일 시트를 초기화
  const [sheet] = useState(() => new ServerStyleSheet());

  // 서버에서 렌더링 직전에 스타일 태그를 삽입
  useServerInsertedHTML(() => {
    const styles = sheet.getStyleElement(); // 수집된 스타일 요소 반환
    sheet.instance.clearTag(); // 중복 삽입 방지 (메모리 누수 예방)
    return <>{styles}</>; // 삽입된 스타일 반환
  });

  // StyleSheetManager로 자식 컴포넌트를 감싸 SSR 스타일 수집 가능하게 처리
  return (
    <StyleSheetManager sheet={sheet.instance}>{children}</StyleSheetManager>
  );
}
