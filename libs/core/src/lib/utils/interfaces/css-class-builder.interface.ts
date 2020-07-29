import { HasElementRef } from '../public_api';

export interface CssClassBuilder extends HasElementRef {
    classList?: string;
    class: string;
    buildComponentCssClass(): string;
}
