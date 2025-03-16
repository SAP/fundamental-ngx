import { FdLanguageKeyCtx, FdLanguageKeyIdentifier } from '../../models';

export type ResolveFnArgs<K extends FdLanguageKeyIdentifier> =
    FdLanguageKeyCtx<K> extends undefined ? [K] : [K, FdLanguageKeyCtx<K>];

export type ResolveTranslationFn<ReturnType> = <Key extends FdLanguageKeyIdentifier>(
    ...args: ResolveFnArgs<Key>
) => ReturnType;
