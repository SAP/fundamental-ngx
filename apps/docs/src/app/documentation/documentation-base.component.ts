import { Directive, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SectionInterface } from '../documentation/core-helpers/sections-toolbar/section.interface';
import { SectionsToolbarComponent } from '../documentation/core-helpers/sections-toolbar/sections-toolbar.component';
import { BehaviorSubject } from 'rxjs';

const COLLAPSED_BREAKPOINT = 576;
const SMALL_SCREEN_BREAKPOINT = 992;
@Directive()
export class DocumentationBaseComponent implements OnInit {

    @ViewChild('content') contentElRef: ElementRef;

    @ViewChild(SectionsToolbarComponent, { read: SectionsToolbarComponent })
    sectionsToolbar: SectionsToolbarComponent;

    sideCollapsed = new BehaviorSubject(false);

    guides = [];

    components = [];

    layouts = [];

    utilities = [];

    adapters = [];

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
        if (this.contentElRef) {
            this.contentElRef.nativeElement.focus();
        }
    }

    handleMenuCollapseClick(): void {
        this.sideCollapsed.next(!this.sideCollapsed.value);
    }

    closeSideBar(): void {
        this.sideCollapsed.next(true);
    }

    onActivate(): void {
        if (this.contentElRef) {
            this.contentElRef.nativeElement.scrollTop = 0;
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
