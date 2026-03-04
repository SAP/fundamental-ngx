import { ElementRef, InputSignal, InputSignalWithTransform, ModelSignal, OutputEmitterRef } from '@angular/core';

export type Appearance = {
    searchClass: string;
    searchFieldClass: string;
    searchCategoryClass: string;
    searchSubmitClass: string;
    buttonClass: string;
    addonClass: string;
    categoryButtonClass: string;
    categoryDropdownButtonClass: string;
    removeGroupButtonClass: boolean;
    helperClass?: string;
};

export interface SearchComponent {
    placeholder: InputSignal<string>;
    disableRefresh: ModelSignal<boolean>;
    disableSearch: InputSignalWithTransform<boolean, unknown>;
    categoryMode: ModelSignal<'menu' | 'select'>;
    forceSearchButton: ModelSignal<boolean>;
    searchSubmit: OutputEmitterRef<{ text: string; category: string | null }>;
    elementRef: ElementRef<HTMLElement>;
    appearance?: ModelSignal<Appearance | undefined>;
    focus(): void;
}
