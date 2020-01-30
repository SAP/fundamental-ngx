import { HasElementRef } from '../public_api';

export interface CssClassBuilder extends HasElementRef {
    class: string
    buildComponentCssClass(): string;
}
