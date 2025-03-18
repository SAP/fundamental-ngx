import { ObjectPathType } from '@fundamental-ngx/cdk/utils';
import { FdLanguage } from './fd-language';
import { FdLanguageKey } from './fd-language-key';
import { FdLanguageKeyIdentifier } from './fd-language-key-identifier';

export type FdLanguageKeyCtx<T extends FdLanguageKeyIdentifier> =
    ObjectPathType<FdLanguage, T> extends FdLanguageKey<infer Args> ? Args : never;
