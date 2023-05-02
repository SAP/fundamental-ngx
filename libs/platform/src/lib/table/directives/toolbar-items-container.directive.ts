/* eslint-disable jsdoc/require-jsdoc */
import { Directive, ElementRef, forwardRef, inject } from '@angular/core';
import { OverflowPriorityEnum, ToolbarItem } from '@fundamental-ngx/core/toolbar';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdp-toolbar-items-container',
    providers: [{ provide: ToolbarItem, useExisting: forwardRef(() => ToolbarItemsContainerDirective) }]
})
export class ToolbarItemsContainerDirective implements ToolbarItem {
    element: HTMLElement = inject(ElementRef).nativeElement;
    isSpacer = false;
    get width(): number {
        return this.element.clientWidth;
    }
    priority = OverflowPriorityEnum.HIGH;
    group = 0;
}
