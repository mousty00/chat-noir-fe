import { Metadata } from "next";
import { CatDetailContent } from "@/components/cat/cat-detail-content";
import { API_GRAPHQL_URL } from "@/constants/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function fetchCatMeta(id: string) {
  try {
    const res = await fetch(API_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query { catById(id: "${id}") { data { name color image category { name } } } }`,
      }),
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    return json?.data?.catById?.data ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const cat = await fetchCatMeta(id);

  if (!cat) {
    return {
      title: "Cat Not Found",
      description: "This cat could not be found in the archive.",
    };
  }

  const title = cat.name;
  const description = [
    cat.category?.name && `Category: ${cat.category.name}`,
    cat.color && `Color: ${cat.color}`,
  ]
    .filter(Boolean)
    .join(" · ") || "A cat from the Chat Noir archive.";

  return {
    title,
    description,
    openGraph: {
      title: `${cat.name} | Chat Noir`,
      description,
      images: cat.image ? [{ url: cat.image, alt: cat.name }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.name} | Chat Noir`,
      description,
      images: cat.image ? [cat.image] : [],
    },
  };
}

export default async function CatDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <CatDetailContent id={id} />;
}
