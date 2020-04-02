import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { SectionInterface } from '../../documentation/core-helpers/sections-toolbar/section.interface';
import { SectionsToolbarComponent } from '../../documentation/core-helpers/sections-toolbar/sections-toolbar.component';

@Component({
    selector: 'core-documentation',
    styleUrls: ['./core-documentation.component.scss'],
    templateUrl: './core-documentation.component.html'
})
export class CoreDocumentationComponent implements OnInit {
    @ViewChild('content') contentElRef: ElementRef;

    @ViewChild(SectionsToolbarComponent, { read: SectionsToolbarComponent })
    sectionsToolbar: SectionsToolbarComponent;

    sideCollapsed: boolean = window.innerWidth < 576;

    guides = [
        { url: 'core/home', name: 'Home' },
        { url: 'core/new-component', name: 'New Component' }
    ];

    components = [
        { url: 'core/action-bar', name: 'Action Bar' },
        { url: 'core/alert', name: 'Alert' },
        { url: 'core/badgeLabel', name: 'Status Indicator' },
        { url: 'core/bar', name: 'Bar' },
        { url: 'core/breadcrumb', name: 'Breadcrumb' },
        { url: 'core/busyIndicator', name: 'Busy Indicator' },
        { url: 'core/button', name: 'Button' },
        { url: 'core/segmentedButton', name: 'Segmented Button' },
        { url: 'core/checkbox', name: 'Checkbox' },
        { url: 'core/splitButton', name: 'Split Button' },
        { url: 'core/calendar', name: 'Calendar' },
        { url: 'core/combobox', name: 'Combobox' },
        { url: 'core/datePicker', name: 'Date Picker' },
        { url: 'core/datetime-picker', name: 'Datetime Picker' },
        { url: 'core/dialog', name: 'Dialog' },
        { url: 'core/dropdown', name: 'Dropdown' },
        { url: 'core/icon', name: 'Icon' },
        { url: 'core/identifier', name: 'Identifier' },
        { url: 'core/image', name: 'Image' },
        { url: 'core/info-label', name: 'Info Label' },
        { url: 'core/inlineHelp', name: 'Inline Help' },
        { url: 'core/input', name: 'Input' },
        { url: 'core/inputGroup', name: 'Input Group' },
        { url: 'core/link', name: 'Link' },
        { url: 'core/list', name: 'List' },
        { url: 'core/loadingSpinner', name: 'Loading Spinner' },
        { url: 'core/localizationEditor', name: 'Localization Editor' },
        { url: 'core/mega-menu', name: 'Mega Menu' },
        { url: 'core/menu', name: 'Menu' },
        { url: 'core/multi-input', name: 'Multi Input' },
        { url: 'core/notification', name: 'Notification' },
        { url: 'core/pagination', name: 'Pagination' },
        { url: 'core/popover', name: 'Popover' },
        { url: 'core/product-switch', name: 'Product Switch' },
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
        { url: 'core/switch', name: 'Switch' },
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

    ngOnInit() {
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
