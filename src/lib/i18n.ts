export const defaultLocale = 'es';
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

export const getLocalePath = (locale: Locale) => `/${locale}`;

export const getLocaleFromPath = (pathname: string): Locale => {
  const segments = pathname.split('/').filter(Boolean);
  const locale = segments[0] as Locale;
  return locales.includes(locale) ? locale : defaultLocale;
};
