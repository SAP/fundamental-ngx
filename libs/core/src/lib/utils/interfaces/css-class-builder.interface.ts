import { Nullable } from '@fundamental-ngx/core/shared';
import { HasElementRef } from './has-element-ref.interface';

export interface CssClassBuilder extends HasElementRef {
    class: Nullable<string>;
    buildComponentCssClass(): string[];
}
