import { HasElementRef, Hash } from '../public_api';

export interface CssStyleBuilder extends HasElementRef {
    buildComponentCssStyle(): Hash<number | string>;
}
