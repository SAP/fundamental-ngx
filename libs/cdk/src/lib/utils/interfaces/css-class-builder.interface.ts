import { Nullable } from '../models/nullable';
import { HasElementRef } from './has-element-ref.interface';

export interface CssClassBuilder extends HasElementRef {
    class: Nullable<string>;
    buildComponentCssClass(): string[];
}
