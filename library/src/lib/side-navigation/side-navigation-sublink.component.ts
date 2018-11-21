import { AfterViewInit, Component, ElementRef, OnChanges } from '@angular/core';

@Component({
    selector: 'fd-side-nav-sublink',
    templateUrl: './side-navigation-sublink.component.html'
})
export class SideNavigationSubLinkComponent implements AfterViewInit, OnChanges {
    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
        const child = this.el.nativeElement.children[0];
        if (child.tagName === 'A') {
            child.classList.add('fd-side-nav__sublink');
        }
    }

    ngOnChanges() {
        this.ngAfterViewInit();
    }
}
