import { InjectionToken, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { MobileMode } from '@fundamental-ngx/core/mobile-mode';

export const SEARCH_FIELD_COMPONENT = new InjectionToken<string[]>('SearchFieldMobileInterface');

export interface SearchFieldMobileInterface extends MobileMode {
    inputText: string;
    isOpenChange: Subject<boolean>;
    isOpen: boolean;

    dialogApprove(): void;
    dialogDismiss(): void;
}

export interface SearchFieldChildContent {
    inputFieldTemplate: TemplateRef<any>;
    suggestionMenuTemplate: TemplateRef<any>;
}
