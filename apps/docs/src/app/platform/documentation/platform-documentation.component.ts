import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SectionInterface } from '../../documentation/core-helpers/sections-toolbar/section.interface';
import { SectionsToolbarComponent } from '../../documentation/core-helpers/sections-toolbar/sections-toolbar.component';

@Component({
    selector: 'platform-documentation',
    styleUrls: ['./platform-documentation.component.scss'],
    templateUrl: './platform-documentation.component.html'
})
export class PlatformDocumentationComponent {
    @ViewChild('content', {static: true }) contentElRef: ElementRef;

    @ViewChild(SectionsToolbarComponent, {static: false, read: SectionsToolbarComponent })
    sectionsToolbar: SectionsToolbarComponent;

    guides = [
        { url: 'platform/home', name: 'Home' },
    ];

    sections: SectionInterface[] = [
        {
            header: 'Guides',
            content: this.guides
        }
    ];

    smallScreen: boolean = window.innerWidth < 992;
    sideCollapsed: boolean = window.innerWidth < 576;

    skipNavClicked() {
        this.contentElRef.nativeElement.focus();
    }


    handleMenuCollapseClick(): void {
        this.sectionsToolbar.sideCollapsed = !this.sectionsToolbar.sideCollapsed;
    }

    onActivate() {
        if (this.smallScreen && !this.sideCollapsed) {
            this.sideCollapsed = true;
        }
        this.contentElRef.nativeElement.scrollTop = 0;
        this.skipNavClicked();
    }

    checkIfCloseSidebar() {
        if (!this.sideCollapsed) {
            this.sideCollapsed = !this.sideCollapsed;
        }
    }

    windowSize() {
        if (window.innerWidth < 992) {
            this.smallScreen = true;
            this.onActivate();
        } else {
            this.smallScreen = false;
            this.sideCollapsed = false;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.windowSize();
    }
}
