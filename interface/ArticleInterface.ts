import { CategoryInterface } from './CategoryInterface';
import { Seo } from './Seo';
import { Locale } from './Locale';
import { ImageInterface } from './ImageInterface';

export interface ArticleInterface {
  authors: any;
  categories: Array<CategoryInterface>;
  created_at: string;
  id: string;
  image: ImageInterface;
  prevImage: any;
  locale: string;
  localizations: Array<Locale>;
  preventIndexing: boolean;
  preview: string;
  published_at: string;
  relatedArticles: RelatedItem;
  seo: Seo;
  slug: string;
  structuredData: any;
  text: string;
  title: string;
  updated_at: string;
  relatedPosts: any;
  relatedTitle: string;
  rate: string;
}

interface RelatedItem {
  id: number | string;
  intro: string;
  articles: Array<ArticleInterface>;
}
