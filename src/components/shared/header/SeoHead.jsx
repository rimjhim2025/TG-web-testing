import { JSDOM } from 'jsdom';

export default function SeoHead({
  seo: seoProp,
  staticMetadata,
  preloadUrls = [],
  paginationLinks,
  seoHTMLDescription,
  seoWebDetailsHTMLDescription,
}) {
  // Choose SEO source: parsed HTML or passed prop
  const seo =
    typeof seoHTMLDescription === 'string' && seoHTMLDescription.trim().length > 0
      ? parseSEOFromHTML(seoHTMLDescription).seo
      : seoProp;

  // AMP style override
  if (
    typeof seoWebDetailsHTMLDescription === 'string' &&
    seoWebDetailsHTMLDescription.trim().length > 0
  ) {
    return (
      <>
        <div dangerouslySetInnerHTML={{ __html: seoWebDetailsHTMLDescription }} />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script
          async
          custom-element="amp-video"
          src="https://cdn.ampproject.org/v0/amp-video-0.1.js"
        ></script>
        <script
          async
          custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        ></script>
        <script
          async
          custom-element="amp-analytics"
          src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
        ></script>
        <link href="https://fonts.googleapis.com/css?family=Oswald:200,300,400" rel="stylesheet" />
      </>
    );
  }

  // Destructure SEO data for cleaner use
  const {
    title,
    description,
    keywords,
    robots,
    contentType,
    language,
    geo = {},
    itemprop = {},
    openGraph = {},
    twitter = {},
    canonical,
    structuredData = [],
  } = seo || {};

  return (
    <>
      <title>{title}</title>

      {preloadUrls?.map((url, i) =>
        url ? <link key={i} rel="preload" as="image" href={url} /> : null
      )}

      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {robots && <meta name="robots" content={robots} />}
      {contentType && <meta httpEquiv="Content-Type" content={contentType} />}
      {language && <meta name="language" content={language} />}
      {geo.region && <meta name="geo.region" content={geo.region} />}
      {geo.placename && <meta name="geo.placename" content={geo.placename} />}
      {geo.position && <meta name="geo.position" content={geo.position} />}

      {itemprop.name && <meta itemProp="name" content={itemprop.name} />}
      {itemprop.image && <meta itemProp="image" content={itemprop.image} />}
      {itemprop.url && <meta itemProp="url" content={itemprop.url} />}
      {itemprop.description && <meta itemProp="description" content={itemprop.description} />}

      {openGraph.title && <meta property="og:title" content={openGraph.title} />}
      {openGraph.type && <meta property="og:type" content={openGraph.type} />}
      {openGraph.url && <meta property="og:url" content={openGraph.url} />}
      {openGraph.description && <meta property="og:description" content={openGraph.description} />}
      {openGraph.image && <meta property="og:image" content={openGraph.image} />}
      {openGraph.siteName && <meta property="og:site_name" content={openGraph.siteName} />}

      {twitter.card && <meta name="twitter:card" content={twitter.card} />}
      {twitter.title && <meta name="twitter:title" content={twitter.title} />}
      {twitter.description && <meta name="twitter:description" content={twitter.description} />}
      {twitter.url && <meta name="twitter:url" content={twitter.url} />}
      {twitter.image && <meta name="twitter:image" content={twitter.image} />}

      {canonical && <link rel="canonical" href={canonical} />}

      {Array.isArray(structuredData) &&
        structuredData.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}

      {paginationLinks && (
        <>
          {paginationLinks.canonical && <link rel="canonical" href={paginationLinks.canonical} />}
          {paginationLinks.prev && <link rel="prev" href={paginationLinks.prev} />}
          {paginationLinks.next && <link rel="next" href={paginationLinks.next} />}
        </>
      )}
    </>
  );
}

export function parseSEOFromHTML(html) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const getContent = (sel, attr = 'content') => doc.querySelector(sel)?.getAttribute(attr) || null;
  const getAllJSON = sel =>
    Array.from(doc.querySelectorAll(sel))
      .map(el => {
        try {
          return JSON.parse(el.textContent);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

  const seo = {
    title: doc.querySelector('title')?.textContent || '',
    description: getContent('meta[name="description"]'),
    keywords: getContent('meta[name="keywords"]'),
    robots: getContent('meta[name="robots"]'),
    contentType: getContent('meta[http-equiv="Content-Type"]'),
    language: getContent('meta[name="language"]'),
    geo: {
      region: getContent('meta[name="geo.region"]'),
      placename: getContent('meta[name="geo.placename"]'),
      position: getContent('meta[name="geo.position"]'),
    },
    itemprop: {
      name: getContent('meta[itemprop="name"]'),
      image: getContent('meta[itemprop="image"]'),
      url: getContent('meta[itemprop="url"]'),
      description: getContent('meta[itemprop="description"]'),
    },
    openGraph: {
      title: getContent('meta[property="og:title"]'),
      type: getContent('meta[property="og:type"]'),
      url: getContent('meta[property="og:url"]'),
      description: getContent('meta[property="og:description"]'),
      image: getContent('meta[property="og:image"]'),
      siteName: getContent('meta[property="og:site_name"]'),
    },
    twitter: {
      card: getContent('meta[name="twitter:card"]'),
      title: getContent('meta[name="twitter:title"]'),
      description: getContent('meta[name="twitter:description"]'),
      url: getContent('meta[name="twitter:url"]'),
      image: getContent('meta[name="twitter:image"]'),
    },
    canonical: getContent('link[rel="canonical"]', 'href'),
    structuredData: getAllJSON('script[type="application/ld+json"]'),
  };

  const paginationLinks = {
    canonical: getContent('link[rel="canonical"]', 'href'),
    prev: getContent('link[rel="prev"]', 'href'),
    next: getContent('link[rel="next"]', 'href'),
  };

  return { seo, paginationLinks, preloadUrls: [] };
}
