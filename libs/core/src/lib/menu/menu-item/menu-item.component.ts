import { Component, ElementRef, forwardRef, HostListener, Input } from '@angular/core';

let checkboxUniqueId: number = 0;

@Component({
    selector: 'fd-menu-item',
    templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {

    @Input()
    hasNestedItems: boolean = false;

    @Input()
    itemId: string = `fd-menu-item-${checkboxUniqueId++}`;

    subLevelVisible: boolean = false;

    @HostListener('document:click', ['$event'])
    clickHandler(event): void {
        if (!this._elementRef.nativeElement.contains(event.target) && this.subLevelVisible) {
            this.subLevelVisible = false;
        }
    }

    constructor(private _elementRef: ElementRef) {}
}
