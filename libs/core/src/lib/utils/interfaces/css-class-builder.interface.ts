import { HasElementRef } from '../public_api';
import { Nullable } from '@fundamental-ngx/core/shared';

export interface CssClassBuilder extends HasElementRef {
    class: Nullable<string>;
    buildComponentCssClass(): string[];
}
