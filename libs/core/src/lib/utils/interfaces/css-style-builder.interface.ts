import { Hash } from '../datatypes';
import { HasElementRef } from './has-element-ref.interface';

export interface CssStyleBuilder extends HasElementRef {
    buildComponentCssStyle(): Hash<number | string>;
}
