import { TemplateRef } from '@angular/core';

export interface PopoverChildContent {
    popoverBodyContentTemplate: TemplateRef<any>,
    popoverFooterContentTemplate: TemplateRef<any>,
}
