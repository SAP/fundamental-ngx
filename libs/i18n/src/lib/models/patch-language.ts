import { FdLanguage } from './fd-language';

export type FdLanguagePatch = { [K in keyof FdLanguage]?: Partial<FdLanguage[K]> };
