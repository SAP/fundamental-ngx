import { AfterViewInit, Component, ElementRef, OnChanges } from '@angular/core';

@Component({
    selector: 'fd-menu-item',
    templateUrl: './menu-item.component.html'
})
export class MenuItemComponent implements AfterViewInit, OnChanges {
    constructor(private itemEl: ElementRef) {}

    ngAfterViewInit() {
        if (
            this.itemEl &&
            this.itemEl.nativeElement &&
            this.itemEl.nativeElement.children &&
            this.itemEl.nativeElement.children[0]
        ) {
            this.itemEl.nativeElement.children[0].classList.add('fd-menu__item');
        }
    }

    ngOnChanges() {
        this.ngAfterViewInit();
    }
}
