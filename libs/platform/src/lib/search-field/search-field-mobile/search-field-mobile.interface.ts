import { EventEmitter, InjectionToken, TemplateRef } from '@angular/core';
import { MobileMode } from '@fundamental-ngx/core/mobile-mode';

export const SEARCH_FIELD_COMPONENT = new InjectionToken<string[]>('SearchFieldMobileInterface');

export interface SearchFieldMobileInterface extends MobileMode {
    inputText: string;
    isOpenChange: EventEmitter<boolean>;
    isOpen: boolean;

    dialogApprove(): void;
    dialogDismiss(): void;
}

export interface SearchFieldChildContent {
    inputFieldTemplate: TemplateRef<any>,
    suggestionMenuTemplate: TemplateRef<any>
}
