import { FdLanguage } from './lang';

export type FdLanguagePatch = { [K in keyof FdLanguage]?: Partial<FdLanguage[K]> };
