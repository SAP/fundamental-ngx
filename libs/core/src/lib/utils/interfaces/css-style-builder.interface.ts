import { HasElementRef } from '../public_api';

export interface Hash {
    [key: string]: any;
}

export interface CssStyleBuilder extends HasElementRef {
    buildComponentCssStyle(): Hash;
}
