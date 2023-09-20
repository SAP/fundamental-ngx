import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdLanguageKeyArgs } from '../../models/lang';

export type ResolveFn<ReturnType> = (key: string, args?: Nullable<FdLanguageKeyArgs>) => ReturnType;
