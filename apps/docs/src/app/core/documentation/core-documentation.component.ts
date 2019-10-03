import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SectionInterface } from '../../documentation/core-helpers/sections-toolbar/section.interface';
import { SectionsToolbarComponent } from '../../documentation/core-helpers/sections-toolbar/sections-toolbar.component';

@Component({
    selector: 'core-documentation',
    styleUrls: ['./core-documentation.component.scss'],
    templateUrl: './core-documentation.component.html'
})
export class CoreDocumentationComponent implements OnInit {
    @ViewChild('content', {static: true }) contentElRef: ElementRef;

    @ViewChild(SectionsToolbarComponent, {static: false, read: SectionsToolbarComponent })
    sectionsToolbar: SectionsToolbarComponent;

    guides = [
        { url: 'core/home', name: 'Home' },
        { url: 'core/new-component', name: 'New Component' }
    ];

    components = [
        { url: 'core/action-bar', name: 'Action Bar' },
        { url: 'core/alert', name: 'Alert' },
        { url: 'core/badgeLabel', name: 'Status Indicator' },
        { url: 'core/breadcrumb', name: 'Breadcrumb' },
        { url: 'core/button', name: 'Button' },
        { url: 'core/buttonGroup', name: 'Button Group' },
        { url: 'core/checkbox', name: 'Checkbox' },
        { url: 'core/splitButton', name: 'Split Button' },
        { url: 'core/calendar', name: 'Calendar' },
        { url: 'core/combobox', name: 'Combobox' },
        { url: 'core/datePicker', name: 'Date Picker' },
        { url: 'core/datetime-picker', name: 'Datetime Picker' },
        { url: 'core/dropdown', name: 'Dropdown' },
        { url: 'core/icon', name: 'Icon' },
        { url: 'core/identifier', name: 'Identifier' },
        { url: 'core/image', name: 'Image' },
        { url: 'core/inlineHelp', name: 'Inline Help' },
        { url: 'core/input', name: 'Input' },
        { url: 'core/inputGroup', name: 'Input Group' },
        { url: 'core/list', name: 'List' },
        { url: 'core/loadingSpinner', name: 'Loading Spinner' },
        { url: 'core/localizationEditor', name: 'Localization Editor' },
        { url: 'core/mega-menu', name: 'Mega Menu' },
        { url: 'core/menu', name: 'Menu' },
        { url: 'core/modal', name: 'Modal' },
        { url: 'core/multi-input', name: 'Multi Input' },
        { url: 'core/pagination', name: 'Pagination' },
        { url: 'core/popover', name: 'Popover' },
        { url: 'core/radio', name: 'Radio Button' },
        { url: 'core/select-native', name: 'Select Native' },
        { url: 'core/select', name: 'Select' },
        { url: 'core/shellbar', name: 'Shellbar' },
        { url: 'core/sideNavigation', name: 'Side Navigation' },
        { url: 'core/table', name: 'Table' },
        { url: 'core/tabs', name: 'Tabs' },
        { url: 'core/textarea', name: 'Textarea' },
        { url: 'core/tile', name: 'Tile' },
        { url: 'core/time', name: 'Time' },
        { url: 'core/timePicker', name: 'Time Picker' },
        { url: 'core/toggle', name: 'Toggle' },
        { url: 'core/token', name: 'Token' },
        // { url: 'core/tree', name: 'Tree' }
    ];

    layouts = [
        { url: 'core/panel', name: 'Panel' },
        { url: 'core/layoutGrid', name: 'Layout Grid' }
    ];

    utilities = [
        { url: 'core/file-input', name: 'File Input' },
        { url: 'core/infiniteScroll', name: 'Infinite Scroll' },
        { url: 'core/popover-directive', name: 'Popover Helper' },
        { url: 'core/scroll-spy', name: 'Scroll Spy' }
    ];

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
        },
    ];

    smallScreen: boolean = window.innerWidth < 992;
    sideCollapsed: boolean = window.innerWidth < 576;

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
