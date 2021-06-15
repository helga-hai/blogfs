import { ContentStore } from './state';

/**
 * Mutations are the only way to actually change
 * state in the store and must be synchronous.
 * @category ContentStore
 */
export default {
  /**
   * Set the news state of the TheBar.
   * @param state Content state.
   * @param payload Record<string, ArticleInterface[]>.
   */
  setNews(state: ContentStore, payload: any): void {
    const news = [...payload.content];
    news.length = 5;
    state.news[payload.type] = news;
  },

  /**
   * Set the currency rates.
   * @param state Content state.
   * @param payload Record<string, ArticleInterface[]>.
   */
  setRate(state: ContentStore, payload: any): void {
    state.rate = payload;
  },

  /**
   * Set the categories.
   * @param state Content state.
   * @param payload Record<string, CategoryInterface[]>.
   */
  setCategories(state: ContentStore, payload: any): void {
    state.categories = [...payload.content];
  },

  /**
   * Mutation used to define is a category.
   * @param state Content state.
   * @param payload Record<string, ArticleInterface[]>.
   */
  isCategory(state: ContentStore, payload: boolean): void {
    state.isCategory = payload;
  },
};
