import type { ArticleInterface } from '@/interface/ArticleInterface';
import type { CategoryInterface } from '@/interface/CategoryInterface';

/**
 * Describes the state of the layout.
 * @category ContentStore
 */
export interface ContentStore {
  categories: CategoryInterface[];
  news: Record<string, ArticleInterface[]>;
  isCategory: boolean;
  rate: any[] | null;
  banner: any;
  social: Record<string, any>[] | null;
}

/**
 * The initial state of the layout.
 * @category ContentStore
 */
export default (): ContentStore => ({
  categories: [],
  news: {},
  isCategory: false,
  rate: null,
  social: null,
  banner: null,
});
