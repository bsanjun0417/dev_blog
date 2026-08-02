# san2blog

Astro와 Markdown 기반 개인 블로그입니다. 개발 기록, 영어 메모, 프로젝트 글을 정적 페이지로 관리합니다.

## 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview
```

`npm run build`는 Astro 빌드 후 Pagefind 검색 인덱스를 `dist/pagefind`에 생성합니다.

## 글 추가

글은 `src/content/posts` 아래에 Markdown 파일로 추가합니다.

```md
---
title: "글 제목"
description: "글 요약"
date: "2026-05-20"
category: "dev"
cover: "./cover.png"
tags: ["astro", "blog"]
draft: false
---

본문을 Markdown으로 작성합니다.
```

이미지를 함께 관리하려면 글마다 폴더를 만드는 방식을 권장합니다.

```text
src/content/posts/my-post/
  index.md
  cover.png
  detail.png
```

본문 이미지는 `![설명](./detail.png)`처럼 상대 경로로 넣을 수 있습니다. 영상은 `public/videos`에 둔 뒤 Markdown 안에서 `<video controls src="/videos/name.mp4"></video>`처럼 사용합니다.

지원 카테고리는 `dev`, `english`, `memo`, `project`입니다.

## 배포

`.github/workflows/deploy.yml`은 `main` 브랜치 push 시 `npm run build`를 실행하고 `dist` 폴더를 GitHub Pages에 배포합니다.
