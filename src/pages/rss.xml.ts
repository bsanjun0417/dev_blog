import { getPublishedPosts } from "@lib/posts";

const siteUrl = process.env.SITE ?? "https://blog.san2blog.com";
const basePath = process.env.BASE_PATH ?? "/";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getAbsoluteUrl(path: string) {
  const base = new URL(basePath, siteUrl);
  return new URL(path.replace(/^\//, ""), base).toString();
}

export async function GET() {
  const posts = await getPublishedPosts();
  const latestDate = posts[0]?.data.date ?? new Date();

  const items = posts.map((post) => {
    const link = getAbsoluteUrl(`/posts/${post.slug}`);

    return `
      <item>
        <title>${escapeXml(post.data.title)}</title>
        <description>${escapeXml(post.data.description)}</description>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${post.data.date.toUTCString()}</pubDate>
        <category>${escapeXml(post.data.category)}</category>
      </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>san2blog</title>
    <description>개발 기록, 영어 메모, 프로젝트 노트를 정리하는 개인 블로그입니다.</description>
    <link>${getAbsoluteUrl("/")}</link>
    <lastBuildDate>${latestDate.toUTCString()}</lastBuildDate>
    <language>ko-KR</language>
    ${items.join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
