/**
 * posts.ts
 * ──────────────────────────────────────────────────────────────────────────
 * 블로그 전체에서 공통으로 사용하는 유틸리티 모음.
 *
 * 역할:
 *  - 게시글 목록 조회 및 필터링
 *  - 날짜 포맷, URL 생성 등 헬퍼 함수
 *  - 카테고리/태그 트리 생성
 *  - 페이지네이션 계산
 */

import { getCollection, type CollectionEntry } from "astro:content";
import categories from "../data/categories.json";

// ────────────────────────────────────────────────
// 타입 별칭
// ────────────────────────────────────────────────

/** 단일 게시글 타입 */
export type Post = CollectionEntry<"posts">;

// ────────────────────────────────────────────────
// 상수
// ────────────────────────────────────────────────

/** 한 페이지에 보여줄 게시글 수 */
export const POSTS_PER_PAGE = 5;

/**
 * 카테고리 key → label 매핑.
 * 같은 key의 첫 label을 상위 카테고리 표시 이름으로 사용한다.
 */
export const categoryLabels = categories.reduce<Record<string, string>>(
  (acc, { key, label }) => {
    if (!acc[key]) acc[key] = label;
    return acc;
  },
  {}
);

// ────────────────────────────────────────────────
// URL 헬퍼
// ────────────────────────────────────────────────

/**
 * BASE_URL 을 앞에 붙여 절대 경로를 반환한다.
 * GitHub Pages 서브디렉터리 배포 시 BASE_URL 이 "/" 가 아닌 경우에도 정상 동작한다.
 */
export function withBasePath(path: string): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, "")}`;
}

/**
 * 게시글 상세 페이지 URL 을 반환한다.
 * 예: /posts/my-article
 */
export function getPostPath(post: Post): string {
  return withBasePath(`/posts/${post.slug}`);
}

// ────────────────────────────────────────────────
// 게시글 조회
// ────────────────────────────────────────────────

/**
 * draft 가 false 인 게시글을 최신순(날짜 내림차순)으로 반환한다.
 * Astro content collection 의 getCollection 을 직접 사용한다.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// ────────────────────────────────────────────────
// 날짜 포맷
// ────────────────────────────────────────────────

/**
 * Date 객체를 한국어 날짜 문자열로 변환한다.
 * 예: 2025년 6월 21일
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

// ────────────────────────────────────────────────
// 태그
// ────────────────────────────────────────────────

/**
 * 게시글 배열에서 중복 없이 모든 태그를 가나다(알파벳)순으로 반환한다.
 */
export function getAllTags(posts: Post[]): string[] {
  return Array.from(new Set(posts.flatMap((post) => post.data.tags))).sort(
    (a, b) => a.localeCompare(b)
  );
}

/**
 * 게시글 배열에서 등장 순서대로 태그를 반환한다.
 * 사이드바 "Recent Tags" 처럼 최신 흐름을 반영할 때 사용한다.
 */
export function getRecentTags(posts: Post[]): string[] {
  const tags = new Set<string>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

// ────────────────────────────────────────────────
// 카테고리
// ────────────────────────────────────────────────

/**
 * 각 카테고리별 게시글 수를 반환한다.
 * categories.json 에 정의된 카테고리 key 순서를 따른다.
 */
export function getCategoryCounts(
  posts: Post[]
): { key: string; label: string; count: number }[] {
  // key 중복 제거: 상위 카테고리 목록만 추출
  const uniqueKeys = [...new Set(categories.map((c) => c.key))];
  return uniqueKeys.map((key) => ({
    key,
    label: categoryLabels[key] ?? key,
    count: posts.filter((post) => post.data.category === key).length
  }));
}

/**
 * 카테고리 트리를 반환한다.
 * 각 카테고리 항목에 하위 카테고리(subcategories) 배열이 포함된다.
 *
 * 하위 카테고리 결정 규칙:
 *  1. categories.json 에 설정된 label 값을 우선 사용한다.
 *  2. 설정에 없는 태그는 추가로 나열한다.
 */
export function getCategoryTree(posts: Post[]) {
  return getCategoryCounts(posts).map((category) => {
    const categoryPosts = posts.filter(
      (post) => post.data.category === category.key
    );

    // 설정 파일에 등록된 하위 카테고리
    const configuredSubcategories = categories
      .filter((item) => item.key === category.key)
      .slice(1)
      .map((item) => ({
        key: item.label,
        label: item.label,
        count: categoryPosts.filter((post) =>
          post.data.tags.includes(item.label)
        ).length
      }));

    // 설정에 없는 태그를 추가 하위 카테고리로 포함
    const configuredKeys = new Set(configuredSubcategories.map((s) => s.key));
    const tagSubcategories = getAllTags(categoryPosts)
      .filter((tag) => !configuredKeys.has(tag))
      .map((tag) => ({
        key: tag,
        label: tag,
        count: categoryPosts.filter((post) => post.data.tags.includes(tag))
          .length
      }));

    return {
      ...category,
      subcategories: [...configuredSubcategories, ...tagSubcategories]
    };
  });
}

// ────────────────────────────────────────────────
// 페이지네이션
// ────────────────────────────────────────────────

/**
 * 전체 페이지 수를 반환한다. 최소값은 1.
 */
export function getPageCount(
  posts: Post[],
  pageSize = POSTS_PER_PAGE
): number {
  return Math.max(1, Math.ceil(posts.length / pageSize));
}

/**
 * 지정한 페이지(1-based)에 해당하는 게시글 슬라이스를 반환한다.
 */
export function getPaginatedPosts(
  posts: Post[],
  page: number,
  pageSize = POSTS_PER_PAGE
): Post[] {
  const start = (page - 1) * pageSize;
  return posts.slice(start, start + pageSize);
}
