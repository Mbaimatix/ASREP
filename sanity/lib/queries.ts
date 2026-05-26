/**
 * ASREP Africa — Sanity GROQ Queries
 *
 * All data fetching happens through these typed query strings.
 * Import the appropriate query and pass it to readClient.fetch().
 */

// ─── Reusable projection fragments ───────────────────────────────────────────

const imageFields = `
  "url": asset->url,
  alt,
  "dimensions": asset->metadata.dimensions,
  hotspot,
  crop
`;

const slugFields = `"slug": slug.current`;

// ─── Site Settings (homepage) ─────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    heroSlides[] {
      image {
        ${imageFields}
      }
    },
    impactNumbers[] {
      value,
      label,
      sublabel
    },
    pullQuote {
      quote,
      attribution
    },
    partnerLogos[] {
      logo { ${imageFields} },
      name,
      url
    },
    historyMilestones[] {
      date,
      title,
      description,
      image { ${imageFields} }
    },
    linkedInUrl,
    facebookUrl,
    youtubeUrl
  }
`;

// ─── News ─────────────────────────────────────────────────────────────────────

export const NEWS_LIST_QUERY = `
  *[_type == "news" && publicationStatus == "published"] | order(publishedAt desc) {
    title,
    ${slugFields},
    excerpt,
    category,
    publishedAt,
    author,
    featuredImage { ${imageFields} }
  }
`;

export const NEWS_BY_CATEGORY_QUERY = `
  *[_type == "news" && publicationStatus == "published" && category == $category] | order(publishedAt desc) {
    title,
    ${slugFields},
    excerpt,
    category,
    publishedAt,
    author,
    featuredImage { ${imageFields} }
  }
`;

export const NEWS_POST_QUERY = `
  *[_type == "news" && slug.current == $slug && publicationStatus == "published"][0] {
    title,
    ${slugFields},
    excerpt,
    category,
    publishedAt,
    author,
    authorRole,
    metaDescription,
    featuredImage { ${imageFields} },
    content[] {
      ...,
      _type == "image" => {
        ${imageFields},
        alt,
        caption
      }
    }
  }
`;

export const NEWS_FEATURED_QUERY = `
  *[_type == "news" && publicationStatus == "published"] | order(publishedAt desc)[0...3] {
    title,
    ${slugFields},
    excerpt,
    category,
    publishedAt,
    featuredImage { ${imageFields} }
  }
`;

export const NEWS_RELATED_QUERY = `
  *[_type == "news" && publicationStatus == "published" && category == $category && slug.current != $slug] | order(publishedAt desc)[0...3] {
    title,
    ${slugFields},
    excerpt,
    category,
    publishedAt,
    featuredImage { ${imageFields} }
  }
`;

// ─── Impact Stories ───────────────────────────────────────────────────────────

export const IMPACT_STORIES_QUERY = `
  *[_type == "impactStory" && publicationStatus == "published"] | order(publishedAt desc) {
    title,
    ${slugFields},
    excerpt,
    programme,
    publishedAt,
    heroImage { ${imageFields} }
  }
`;

export const IMPACT_STORY_QUERY = `
  *[_type == "impactStory" && slug.current == $slug && publicationStatus == "published"][0] {
    title,
    ${slugFields},
    programme,
    publishedAt,
    heroImage { ${imageFields} },
    pullQuote { quote, attribution },
    body[] {
      ...,
      _type == "image" => { ${imageFields}, alt, caption }
    }
  }
`;

// ─── Team & Board ─────────────────────────────────────────────────────────────

export const TEAM_QUERY = `
  *[_type == "teamMember"] | order(order asc) {
    name,
    title,
    boardRole,
    credentials,
    shortBio,
    fullBio,
    linkedIn,
    photo { ${imageFields} }
  }
`;

// ─── Publications ─────────────────────────────────────────────────────────────

export const PUBLICATIONS_QUERY = `
  *[_type == "publication"] | order(year desc) {
    title,
    year,
    publicationType,
    description,
    status,
    isFeatured,
    publishedAt,
    coverImage { ${imageFields} },
    "pdfUrl": pdfFile.asset->url,
    externalUrl
  }
`;

export const ANNUAL_REPORTS_QUERY = `
  *[_type == "publication" && publicationType == "annual-report"] | order(year desc) {
    title,
    year,
    description,
    coverImage { ${imageFields} },
    "pdfUrl": pdfFile.asset->url
  }
`;

// ─── Gallery ──────────────────────────────────────────────────────────────────

export const GALLERY_BY_CATEGORY_QUERY = `
  *[_type == "gallery" && category == $category][0] {
    title,
    category,
    photos[] { ${imageFields}, caption },
    videos[] { youtubeUrl, title, thumbnail { ${imageFields} } }
  }
`;

export const ALL_GALLERY_QUERY = `
  *[_type == "gallery"] {
    title,
    category,
    photos[] { ${imageFields}, caption }
  }
`;

// ─── All slugs (for static generation) ───────────────────────────────────────

export const ALL_NEWS_SLUGS_QUERY = `
  *[_type == "news" && publicationStatus == "published"] { ${slugFields} }
`;

export const ALL_IMPACT_STORY_SLUGS_QUERY = `
  *[_type == "impactStory" && publicationStatus == "published"] { ${slugFields} }
`;
