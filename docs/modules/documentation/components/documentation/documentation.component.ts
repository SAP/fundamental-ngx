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
        { url: 'action-bar', name: 'Action Bar' },
        { url: 'alert', name: 'Alert' },
        { url: 'badgeLabel', name: 'Badge, Status & Label' },
        { url: 'breadcrumb', name: 'Breadcrumb' },
        { url: 'button', name: 'Button' },
        { url: 'buttonGroup', name: 'Button Group' },
        { url: 'calendar', name: 'Calendar' },
        { url: 'comboboxInput', name: 'Combobox Input'},
        { url: 'datePicker', name: 'Date Picker' },
        { url: 'dropdown', name: 'Dropdown' },
        { url: 'form', name: 'Form' },
        { url: 'icon', name: 'Icon' },
        { url: 'identifier', name: 'Identifier' },
        { url: 'image', name: 'Image' },
        { url: 'inlineHelp', name: 'Inline Help' },
        { url: 'inputGroup', name: 'Input Group' },
        { url: 'list', name: 'List' },
        { url: 'menu', name: 'Menu' },
        { url: 'modal', name: 'Modal' },
        { url: 'pagination', name: 'Pagination' },
        { url: 'panel', name: 'Panel' },
        { url: 'popover', name: 'Popover' },
        { url: 'searchInput', name: 'Search Input' },
        { url: 'shellbar', name: 'Shellbar' },
        { url: 'sideNavigation', name: 'Side Navigation' },
        { url: 'table', name: 'Table' },
        { url: 'tabs', name: 'Tabs' },
        { url: 'tile', name: 'Tile' },
        { url: 'time', name: 'Time' },
        { url: 'timePicker', name: 'Time Picker' }
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
}
