import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ValueHelpFilterDefDirective } from '../directives/value-help-filter-def.directive';

export interface VhdFilter {
    key: string;
    label: string;
    main?: boolean;
    value?: string;
    advanced?: boolean;
    include?: boolean;
    exclude?: boolean;
    filterDef: Nullable<ValueHelpFilterDefDirective>;
}
