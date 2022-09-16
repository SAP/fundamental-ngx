import { Component, ContentChild, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SectionInterface, SectionInterfaceContent } from './core-helpers/sections-toolbar/section.interface';
import { SectionsToolbarComponent } from './core-helpers/sections-toolbar/sections-toolbar.component';
import { BehaviorSubject } from 'rxjs';

const SMALL_SCREEN_BREAKPOINT = 992;

@Component({
    selector: 'fd-base-documentation',
    template: '<ng-content></ng-content>',
    styleUrls: ['./documentation-base.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DocumentationBaseComponent implements OnInit {
    @Input() content: HTMLElement;
    @Input() components: SectionInterfaceContent[] = [];

    @ContentChild(SectionsToolbarComponent, { read: SectionsToolbarComponent })
    sectionsToolbar: SectionsToolbarComponent;

    sideCollapsed = new BehaviorSubject(false);

    guides: SectionInterfaceContent[] = [];

    layouts: SectionInterfaceContent[] = [];

    utilities: SectionInterfaceContent[] = [];

    adapters: SectionInterfaceContent[] = [];

    sections: SectionInterface[] = [];

    smallScreen: boolean = window.innerWidth < SMALL_SCREEN_BREAKPOINT;

    ngOnInit(): void {
        this.components.sort((el1, el2) => {
            if (el1.name < el2.name) {
                return -1;
            }

            if (el1.name > el2.name) {
                return 1;
            }
            return 0;
        });
    }

    skipNavClicked(): void {
        if (this.content) {
            this.content.focus();
        }
    }

    handleMenuCollapseClick(): void {
        this.sideCollapsed.next(!this.sideCollapsed.value);
    }

    closeSideBar(): void {
        this.sideCollapsed.next(true);
    }

    onActivate(): void {
        if (this.content) {
            this.content.scrollTop = 0;
        }
        this.skipNavClicked();
        if (this.sectionsToolbar) {
            this.sectionsToolbar.onActivate();
        }
    }

    windowSize(): void {
        this.smallScreen = window.innerWidth < SMALL_SCREEN_BREAKPOINT;
    }

    @HostListener('window:resize', ['$event'])
    onResize(): void {
        this.windowSize();
        this._isCollapsed();
    }

    private _isCollapsed(): void {
        if (window.innerWidth < SMALL_SCREEN_BREAKPOINT) {
            this.sideCollapsed.next(true);
        }
    }
}
