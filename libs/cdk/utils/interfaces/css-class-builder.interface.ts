import { InputSignal } from '@angular/core';
import { Nullable } from '../models/nullable';
import { HasElementRef } from './has-element-ref.interface';

export interface CssClassBuilder extends HasElementRef {
    /**
     * The class for the component
     **/
    class: Nullable<string> | InputSignal<string | undefined>;

    /**
     * Method to build component css class
     */
    buildComponentCssClass(): string[];
}
