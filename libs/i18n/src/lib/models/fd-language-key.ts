import { Nullable } from '@fundamental-ngx/cdk/utils';

export type FdLanguageKeyArgs = Nullable<Record<string, string | number | boolean>>;

export type FdLanguageKeyFunction<T> = T extends undefined ? () => string : (args: T) => string;

export type FdLanguageKey<T = undefined> = string | FdLanguageKeyFunction<T>;
