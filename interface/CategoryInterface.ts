import { ArticleInterface } from './ArticleInterface';
import { Seo } from './Seo';
import { Locale } from './Locale';

export interface CategoryInterface {
  id: string;
  title: string;
  articles: Array<ArticleInterface>;
  description: string;
  slug: string;
  seo: Seo;
  preventIndexing: false;
  localizations: Array<Locale>;
  locale: string;
  published_at: string;
  structuredData: any;
}
