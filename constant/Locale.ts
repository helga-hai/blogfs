/** Default client language [ISO 639-1]. */
export const defaultLang: string = 'en';

/** Default client country [ISO 3166]. */
export const defaultCountry: string = 'US';

/** Default client locale [ISO 639-1]-[ISO 3166]. */
export const defaultLocale: string = `${defaultLang}-${defaultCountry}`;

/**
 * Determine whether the `lang` is default.
 * @param lang Language to check.
 * @returns True in case is default; false otherwise.
 */
export function isDefaultLang(lang: string): boolean {
  return lang === defaultLang;
}
