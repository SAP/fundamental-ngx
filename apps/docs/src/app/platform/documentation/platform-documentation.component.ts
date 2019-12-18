import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SectionInterface } from '../../documentation/core-helpers/sections-toolbar/section.interface';
import { SectionsToolbarComponent } from '../../documentation/core-helpers/sections-toolbar/sections-toolbar.component';

@Component({
    selector: 'platform-documentation',
    styleUrls: ['./platform-documentation.component.scss'],
    templateUrl: './platform-documentation.component.html'
})
export class PlatformDocumentationComponent {
    @ViewChild('content', { static: true }) contentElRef: ElementRef;

    @ViewChild(SectionsToolbarComponent, { static: false, read: SectionsToolbarComponent })
    sectionsToolbar: SectionsToolbarComponent;

    sideCollapsed: boolean = window.innerWidth < 576;

    guides = [{ url: 'platform/home', name: 'Home' }, { url: 'platform/new-component', name: 'New Component' }];

   

    components = [{ url: 'platform/action-bar', name: 'Action Bar' }, 
                  { url: 'platform/button', name: 'Button' }, 
                  { url: 'platform/menu', name: 'Menu' }
                 ];


    layouts = [];

    utilities = [];

    sections: SectionInterface[] = [
        {
            header: 'Guides',
            content: this.guides
        },
        {
            header: 'Components',
            content: this.components
        },
        {
            header: 'layouts',
            content: this.layouts
        },
        {
            header: 'Utilities',
            content: this.utilities
        }
    ];

    smallScreen: boolean = window.innerWidth < 992;

    skipNavClicked() {
        if (this.contentElRef) {
            this.contentElRef.nativeElement.focus();
        }
    }

    handleMenuCollapseClick(): void {
        this.sideCollapsed = !this.sideCollapsed;
    }

    closeSideBar(): void {
        this.sideCollapsed = true;
    }

    isSideBarCollapsed(): boolean {
        return this.sideCollapsed;
    }

    onActivate() {
        if (this.contentElRef) {
            this.contentElRef.nativeElement.scrollTop = 0;
        }
        this.skipNavClicked();
        if (this.sectionsToolbar) {
            this.sectionsToolbar.onActivate();
        }
    }

    windowSize() {
        this.smallScreen = window.innerWidth < 992;
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.windowSize();
    }
}
