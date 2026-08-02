/**
 * config.ts (Astro Content Collections 설정)
 * ──────────────────────────────────────────────────────────────────────────
 * Astro Content Collection 스키마를 정의한다.
 * categories.json에 등록된 key만 카테고리 값으로 허용한다.
 *
 * 스키마 필드:
 *  title       - 게시글 제목
 *  description - 요약 설명
 *  date        - 작성일
 *  category    - 카테고리 key
 *  cover       - 썸네일 이미지 경로
 *  tags        - 태그 배열
 *  draft       - 임시저장 여부
 */
import { defineCollection, z } from "astro:content";
import categories from "../data/categories.json";

// categories.json 의 key 를 중복 제거해 enum 타입으로 사용한다.
const categoryKeys = Array.from(new Set(categories.map((c) => c.key))) as [
  string,
  ...string[],
];

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      category: z.enum(categoryKeys),
      cover: image().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
