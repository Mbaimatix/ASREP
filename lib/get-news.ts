import fs from "fs";
import path from "path";
import matter from "gray-matter";

const newsDir = path.join(process.cwd(), "content/news");

export type Article = {
  slug: string;
  title: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  heroImage: string;
  heroAlt: string;
  author: string;
  authorRole: string;
  body: string;
};

export function getArticleSlugs(): string[] {
  return fs
    .readdirSync(newsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getArticle(slug: string): Article | null {
  const file = path.join(newsDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf-8"));
  return {
    slug,
    title: data.title ?? "",
    publishedAt: data.publishedAt ?? "",
    category: data.category ?? "",
    excerpt: data.excerpt ?? "",
    heroImage: data.heroImage ?? "",
    heroAlt: data.heroAlt ?? "",
    author: data.author ?? "ASREP Africa",
    authorRole: data.authorRole ?? "",
    body: content.trim(),
  };
}

export function getArticleList(): Omit<Article, "body">[] {
  return getArticleSlugs()
    .map((s) => getArticle(s))
    .filter((a): a is Article => a !== null)
    .map(({ body: _body, ...rest }) => rest)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}
