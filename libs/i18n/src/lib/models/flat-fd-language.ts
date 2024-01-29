import { ObjectPathType } from '@fundamental-ngx/cdk/utils';
import { FdLanguage } from './fd-language';
import { FdLanguageKeyIdentifier } from './fd-language-key-identifier';

export type FlatFdLanguage = {
    [Key in FdLanguageKeyIdentifier]: ObjectPathType<FdLanguage, Key>;
};
