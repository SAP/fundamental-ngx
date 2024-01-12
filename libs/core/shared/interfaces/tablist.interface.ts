import { ElementRef } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';

export interface TabList {
    stackContent: boolean;
    scrollableElement: Nullable<ElementRef>;
    headerContainer: Nullable<ElementRef>;
    highlightActiveTab(id: Nullable<string>, scroll?: boolean): void;
}
