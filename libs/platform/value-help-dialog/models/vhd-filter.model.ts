import { TemplateRef } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

export interface ValueHelpFilterDefContext {
    $implicit: VhdFilter;
}

export interface ValueHelpFilterDef {
    templateRef: TemplateRef<ValueHelpFilterDefContext>;
}
export interface VhdFilter {
    key: string;
    label: string;
    main?: boolean;
    value?: string;
    advanced?: boolean;
    include?: boolean;
    exclude?: boolean;
    filterDef: Nullable<ValueHelpFilterDef>;
}
