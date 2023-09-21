import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdLanguageKeyArgs, FdLanguageKeyIdentifier } from '../../models/lang';

export type ResolveFn<ReturnType> = (key: FdLanguageKeyIdentifier, args?: Nullable<FdLanguageKeyArgs>) => ReturnType;
