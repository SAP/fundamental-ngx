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
        { url: 'action-bar', name: 'Action Bar', status: 'SAFE' },
        { url: 'alert', name: 'Alert', status: 'UNSAFE' },
        { url: 'badgeLabel', name: 'Badge', status: 'SAFE' },
        { url: 'breadcrumb', name: 'Breadcrumb', status: 'SAFE' },
        { url: 'button', name: 'Button', status: 'SAFE' },
        { url: 'buttonGroup', name: 'Button Group', status: 'SAFE' },
        { url: 'calendar', name: 'Calendar', status: 'ACTIVE' },
        { url: 'comboboxInput', name: 'Combobox Input', status: 'SAFE' },
        { url: 'datePicker', name: 'Date Picker', status: 'ACTIVE' },
        { url: 'datetime-picker', name: 'Datetime Picker', status: 'UNSAFE' },
        { url: 'dropdown', name: 'Dropdown', status: 'SAFE' },
        { url: 'form', name: 'Form', status: 'SAFE' },
        { url: 'icon', name: 'Icon', status: 'SAFE' },
        { url: 'identifier', name: 'Identifier', status: 'SAFE' },
        { url: 'image', name: 'Image', status: 'SAFE' },
        { url: 'inlineHelp', name: 'Inline Help', status: 'SAFE' },
        { url: 'inputGroup', name: 'Input Group', status: 'SAFE' },
        { url: 'list', name: 'List', status: 'SAFE' },
        { url: 'loadingSpinner', name: 'Loading Spinner', status: 'SAFE' },
        { url: 'menu', name: 'Menu', status: 'SAFE' },
        { url: 'modal', name: 'Modal', status: 'UNSAFE' },
        { url: 'multi-input', name: 'Multi Input', status: 'SAFE' },
        { url: 'pagination', name: 'Pagination', status: 'SAFE' },
        { url: 'popover', name: 'Popover', status: 'ACTIVE' },
        { url: 'searchInput', name: 'Search Input', status: 'SAFE' },
        { url: 'shellbar', name: 'Shellbar', status: 'ACTIVE' },
        { url: 'sideNavigation', name: 'Side Navigation', status: 'ACTIVE' },
        { url: 'table', name: 'Table', status: 'UNSAFE' },
        { url: 'tabs', name: 'Tabs', status: 'ACTIVE' },
        { url: 'tile', name: 'Tile', status: 'SAFE' },
        { url: 'time', name: 'Time', status: 'SAFE' },
        { url: 'timePicker', name: 'Time Picker', status: 'SAFE' },
        { url: 'toggle', name: 'Toggle', status: 'SAFE' },
        { url: 'token', name: 'Token', status: 'SAFE' },
    ];

    layouts = [
        { url: 'panel', name: 'Panel', status: 'SAFE' }
    ];

    utilities = [
        { url: 'file-input', name: 'File Input', status: 'UNSAFE' },
        { url: 'infiniteScroll', name: 'Infinite Scroll', status: 'UNSAFE' },
        { url: 'popover-directive', name: 'Popover Helper', status: 'UNSAFE' },
        { url: 'scroll-spy', name: 'Scroll Spy', status: 'UNSAFE' }
    ];

    search: string = '';
    smallScreen: boolean = window.innerWidth < 992;
    sideCollapsed: boolean = window.innerWidth < 576;

    constructor(private router: Router) {}

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
