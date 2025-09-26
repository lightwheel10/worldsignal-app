const GDELT_ENDPOINT = "https://api.gdeltproject.org/api/v2/doc/doc";

export type GdeltArticle = {
  title: string;
  url: string;
  excerpt: string;
  sourceDomain: string;
  sourceCountry?: string;
  publishedAt: string;
  themes: string[];
  language: string;
  socialImage?: string;
};

function parseThemes(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(";")
    .map((theme) => theme.trim())
    .filter(Boolean);
}

function isEnglish(language?: string): boolean {
  if (!language) return false;
  const value = language.toLowerCase();
  return value === "english" || value === "en";
}

function sanitizeImage(url?: string): string | undefined {
  if (!url) {
    return undefined;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return url;
    }
  } catch (error) {
    console.warn("Discarding invalid social image URL from GDELT", url, error);
  }

  return undefined;
}

export async function getGdeltHeadlines(params?: {
  keyword?: string;
  maxStories?: number;
}): Promise<GdeltArticle[]> {
  const baseQuery = params?.keyword ?? "geopolitics OR diplomacy OR conflict";
  const query = baseQuery.includes("(") ? baseQuery : `(${baseQuery})`;
  const maxStories = params?.maxStories ?? 12;

  const searchParams = new URLSearchParams({
    query,
    mode: "ArtList",
    format: "json",
    maxrecords: String(maxStories * 2),
    sort: "DateDesc",
    timespan: "12H",
  });

  try {
    const response = await fetch(`${GDELT_ENDPOINT}?${searchParams.toString()}`, {
      headers: {
        "User-Agent": "WorldSignalApp/1.0 (https://worldsignal.news)",
      },
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      const body = await response.text();
      console.error("GDELT fetch failed", response.status, response.statusText, body.slice(0, 200));
      return [];
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
      const body = await response.text();
      console.warn("GDELT responded with non-JSON payload", body.slice(0, 200));
      return [];
    }

    const data = (await response.json()) as {
      articles?: Array<{
        title: string;
        url: string;
        seendate: string;
        domain: string;
        language?: string;
        sourcecountry?: string;
        socialimage?: string;
        excerpt?: string;
        summary?: string;
        themes?: string;
      }>;
    };

    if (!data.articles?.length) {
      return [];
    }

    return data.articles
      .filter((article) => isEnglish(article.language) && article.url && article.title)
      .map((article) => ({
        title: article.title,
        url: article.url,
        excerpt: article.summary ?? article.excerpt ?? "",
        sourceDomain: article.domain,
        sourceCountry: article.sourcecountry,
        publishedAt: article.seendate,
        themes: parseThemes(article.themes),
        language: article.language ?? "",
        socialImage: sanitizeImage(article.socialimage),
      }))
      .slice(0, maxStories);
  } catch (error) {
    console.error("Failed to load GDELT headlines", error);
    return [];
  }
}
