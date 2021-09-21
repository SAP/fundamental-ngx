import { EventEmitter, InjectionToken } from '@angular/core';
import { MobileMode } from '@fundamental-ngx/core';

export const SEARCH_FIELD_COMPONENT = new InjectionToken<string[]>('SearchFieldMobileInterface');

export interface SearchFieldMobileInterface extends MobileMode {
    inputText: string;
    isOpenChange: EventEmitter<boolean>;
    isOpen: boolean;

    dialogApprove(): void;
    dialogDismiss(): void;
}
