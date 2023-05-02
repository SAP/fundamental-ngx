import { Directive, ElementRef, forwardRef, Input } from '@angular/core';
import { OverflowPriority } from '@fundamental-ngx/cdk/utils';
import { ToolbarItem } from './abstract-toolbar-item.class';
import { OverflowPriorityEnum } from './toolbar.component';

@Directive({
    selector: '[fd-toolbar-item], [fdOverflowGroup], [fdOverflowPriority]',
    providers: [{ provide: ToolbarItem, useExisting: forwardRef(() => ToolbarItemDirective) }]
})
export class ToolbarItemDirective implements ToolbarItem {
    /** The priority of the item. */
    @Input()
    fdOverflowPriority: OverflowPriority = OverflowPriorityEnum.HIGH;
    /** The group number of the item. */
    @Input()
    fdOverflowGroup = 0;

    /** @hidden */
    get group(): number {
        return this.fdOverflowGroup;
    }

    /** @hidden */
    get priority(): OverflowPriority {
        return this.fdOverflowPriority;
    }

    /** @hidden */
    get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }

    /** @hidden */
    get isSpacer(): boolean {
        return this.element.classList.contains('fd-toolbar__spacer');
    }

    /** @hidden */
    get width(): number {
        return this.element.clientWidth + 8; // ELEMENT_MARGIN
    }

    /** @hidden */
    constructor(public elementRef: ElementRef) {}
}
