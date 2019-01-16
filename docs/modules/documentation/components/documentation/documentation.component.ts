import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'documentation',
    styleUrls: ['./documentation.component.scss'],
    templateUrl: './documentation.component.html'
})
export class DocumentationComponent implements OnInit {

    @ViewChild('content') contentElRef: ElementRef;

    components = [
        { url: 'action-bar', name: 'Action Bar', status: 'SAFE' },
        { url: 'alert', name: 'Alert', status: 'SAFE' },
        { url: 'badgeLabel', name: 'Badge', status: 'SAFE' },
        { url: 'breadcrumb', name: 'Breadcrumb', status: 'SAFE' },
        { url: 'button', name: 'Button', status: 'ACTIVE' },
        { url: 'buttonGroup', name: 'Button Group', status: 'SAFE' },
        { url: 'calendar', name: 'Calendar', status: 'SAFE' },
        { url: 'comboboxInput', name: 'Combobox Input', status: 'SAFE' },
        { url: 'datePicker', name: 'Date Picker', status: 'SAFE' },
        { url: 'dropdown', name: 'Dropdown', status: 'SAFE' },
        { url: 'form', name: 'Form', status: 'SAFE' },
        { url: 'icon', name: 'Icon', status: 'SAFE' },
        { url: 'identifier', name: 'Identifier', status: 'SAFE' },
        { url: 'image', name: 'Image', status: 'SAFE' },
        { url: 'inlineHelp', name: 'Inline Help', status: 'SAFE' },
        { url: 'inputGroup', name: 'Input Group', status: 'ACTIVE' },
        { url: 'list', name: 'List', status: 'SAFE' },
        { url: 'loadingSpinner', name: 'Loading Spinner', status: 'SAFE' },
        { url: 'menu', name: 'Menu', status: 'SAFE' },
        { url: 'modal', name: 'Modal', status: 'UNSAFE' },
        { url: 'pagination', name: 'Pagination', status: 'SAFE' },
        { url: 'panel', name: 'Panel', status: 'SAFE' },
        { url: 'popover', name: 'Popover', status: 'ACTIVE' },
        { url: 'searchInput', name: 'Search Input', status: 'SAFE' },
        { url: 'shellbar', name: 'Shellbar', status: 'ACTIVE' },
        { url: 'sideNavigation', name: 'Side Navigation', status: 'SAFE' },
        { url: 'table', name: 'Table', status: 'ACTIVE' },
        { url: 'tabs', name: 'Tabs', status: 'SAFE' },
        { url: 'tile', name: 'Tile', status: 'SAFE' },
        { url: 'time', name: 'Time', status: 'SAFE' },
        { url: 'timePicker', name: 'Time Picker', status: 'SAFE' },
    ];

    search: string = '';

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
        this.router.navigate(['/docs', component]).then(() => {
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
        this.skipNavClicked();
        this.contentElRef.nativeElement.scrollIntoView();
    }
}
