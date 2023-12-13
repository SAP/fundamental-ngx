import { TemplateRef } from '@angular/core';
import { HintOptions } from '@fundamental-ngx/platform/shared';

export interface FieldColumn {
    [key: number]: Array<Field>;
}

export class Field {
    /** @ignore */
    constructor(
        public name?: string,
        public rank?: number,
        public renderer?: TemplateRef<any>,
        public column?: number
    ) {}
}

export class FieldGroup {
    /** @ignore */
    constructor(
        public label: string,
        public fields: FieldColumn,
        public hintOptions?: HintOptions
    ) {}
}
