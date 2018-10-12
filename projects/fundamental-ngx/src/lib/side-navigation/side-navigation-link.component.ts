import { Component, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'fd-side-nav-link',
    templateUrl: './side-navigation-link.component.html'
})
export class SideNavigationLinkComponent implements OnChanges, AfterViewInit {
    @Input()
    hasSublist: boolean = false;

    @Input()
    href: string;

    @ViewChild('link')
    linkEl: ElementRef;

    sublistIsOpen: boolean = false;

    onKeypressHandler(event) {
        if (this.hasSublist && (event.code === 'Enter' || event.code === 'Space')) {
            event.preventDefault();
            this.sublistIsOpen = !this.sublistIsOpen;
        }
    }

    ngOnChanges() {
        /*
         this function determines what element has been placed in ng-content and applies the fd-side-nav__link class appropriately
         */
        if (!this.hasSublist) {
            if (this.linkEl && this.linkEl.nativeElement) {
                if (this.linkEl.nativeElement.children && this.linkEl.nativeElement.children.length) {
                    const children = this.linkEl.nativeElement.children;
                    for (let i = 0; i < children.length; i++) {
                        if (children[i].tagName === 'A') {
                            children[i].classList.add('fd-side-nav__link');
                        }
                    }
                }
            }
        }
    }

    ngAfterViewInit() {
        this.ngOnChanges();
    }
}
