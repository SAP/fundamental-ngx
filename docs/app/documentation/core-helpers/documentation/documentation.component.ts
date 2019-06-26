import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'documentation',
    styleUrls: ['./documentation.component.scss'],
    templateUrl: './documentation.component.html'
})
export class DocumentationComponent implements OnInit {
    @ViewChild('content') contentElRef: ElementRef;

    guides = [
        { url: 'home', name: 'Home' },
        { url: 'new-component', name: 'New Component' }
    ];

    components = [
        { url: 'action-bar', name: 'Action Bar' },
        { url: 'alert', name: 'Alert' },
        { url: 'badgeLabel', name: 'Status Indicator' },
        { url: 'breadcrumb', name: 'Breadcrumb' },
        { url: 'button', name: 'Button' },
        { url: 'buttonGroup', name: 'Button Group' },
        { url: 'calendar', name: 'Calendar' },
        { url: 'comboboxInput', name: 'Combobox Input' },
        { url: 'datePicker', name: 'Date Picker' },
        { url: 'datetime-picker', name: 'Datetime Picker' },
        { url: 'dropdown', name: 'Dropdown' },
        { url: 'form', name: 'Form' },
        { url: 'icon', name: 'Icon' },
        { url: 'identifier', name: 'Identifier' },
        { url: 'image', name: 'Image' },
        { url: 'inlineHelp', name: 'Inline Help' },
        { url: 'inputGroup', name: 'Input Group' },
        { url: 'list', name: 'List' },
        { url: 'loadingSpinner', name: 'Loading Spinner' },
        { url: 'menu', name: 'Menu' },
        { url: 'modal', name: 'Modal' },
        { url: 'multi-input', name: 'Multi Input' },
        { url: 'pagination', name: 'Pagination' },
        { url: 'popover', name: 'Popover' },
        { url: 'searchInput', name: 'Search Input' },
        { url: 'shellbar', name: 'Shellbar' },
        { url: 'sideNavigation', name: 'Side Navigation' },
        { url: 'table', name: 'Table' },
        { url: 'tabs', name: 'Tabs' },
        { url: 'tile', name: 'Tile' },
        { url: 'time', name: 'Time' },
        { url: 'timePicker', name: 'Time Picker' },
        { url: 'toggle', name: 'Toggle' },
        { url: 'token', name: 'Token' }
    ];

    layouts = [
        { url: 'panel', name: 'Panel' }
    ];

    utilities = [
        { url: 'file-input', name: 'File Input' },
        { url: 'infiniteScroll', name: 'Infinite Scroll' },
        { url: 'popover-directive', name: 'Popover Helper' },
        { url: 'scroll-spy', name: 'Scroll Spy' }
    ];

    search: string = '';
    smallScreen: boolean = window.innerWidth < 992;
    sideCollapsed: boolean = window.innerWidth < 576;

    constructor(private router: Router) {
    }

    ngOnInit() {
        // sort the list alphabetically
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

    selectComponent(component) {
        this.router.navigate(['/', component]).then(() => {
            this.skipNavClicked();
        });
    }

    skipNavClicked() {
        this.contentElRef.nativeElement.focus();
    }

    onKeypressHandler(url, event) {
        if (event.code === 'Enter' || event.code === 'Space') {
            event.preventDefault();
            this.selectComponent(url);
        }
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
