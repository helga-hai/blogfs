import { getStrapiMedia } from './medias';

export function getMetaTags(seo) {
  const tags = [];

  if (!seo.preventIndexing) {
    tags.push(
      {
        hid: 'robots',
        name: 'robots',
        content: 'noindex, nofollow',
      },
      {
        hid: 'googlebot',
        name: 'googlebot',
        content: 'noindex, nofollow',
      }
    );
  }
  if (seo.metaTitle) {
    tags.push(
      {
        hid: 'og:title',
        property: 'og:title',
        content: seo.metaTitle,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: seo.metaTitle,
      }
    );
  }
  if (seo.metaDescription) {
    tags.push(
      {
        hid: 'description',
        name: 'description',
        content: seo.metaDescription,
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: seo.metaDescription,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: seo.metaDescription,
      }
    );
  }
  if (seo.shareImage) {
    const imageUrl = getStrapiMedia(seo.shareImage.url);
    tags.push(
      {
        hid: 'image',
        name: 'image',
        content: imageUrl,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: imageUrl,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: imageUrl,
      }
    );
  }
  if (seo.article) {
    tags.push({
      hid: 'og:type',
      property: 'og:type',
      content: 'article',
    });
  }
  tags.push({ hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' });

  return tags;
}
