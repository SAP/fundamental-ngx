import { ElementRef, EventEmitter } from '@angular/core';

export interface SearchComponent {
    placeholder: string;
    disableRefresh: boolean;
    disableSearch: boolean;
    categoryMode: 'menu' | 'select';
    forceSearchButton: boolean;
    searchSubmit: EventEmitter<{ text: string; category: string | null }>;
    elementRef: ElementRef<HTMLElement>;
    focus(): void;
    appearance?: {
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
}
