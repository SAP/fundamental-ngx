import { CdkScrollable } from '@angular/cdk/overlay';
import { NgStyle } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { FlexibleColumnLayout, FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { SelectComponent } from '@fundamental-ngx/core/select';
import { ToolbarComponent, ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { IconTabBarComponent, IconTabBarTabComponent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-icon-tab-bar-text-type-example',
    templateUrl: './platform-icon-tab-bar-text-type-example.component.html',
    styles: `
        .docs-fcl-example-overlay {
            height: 100%;
            width: 0;
            position: fixed;
            z-index: 10;
            top: 0;
            left: 0;
            background-color: rgb(255, 255, 255);
            overflow-x: hidden;
        }

        .docs-fcl-example-overlay-content {
            background: var(--sapGroup_ContentBackground);
            position: relative;
            width: 100%;
        }

        .docs-fcl-example-button {
            display: flex;
            justify-content: flex-end;
            padding: 0.5rem 2rem;
            background: #394a5d;
        }

        .docs-fcl-example-section {
            height: calc(100vh - 77px);

            h2 {
                font-size: 30px;
                text-align: center;
            }

            div {
                display: flex;
                justify-content: space-around;
                margin: 20px;
            }
        }
    `,
    imports: [
        ButtonComponent,
        FlexibleColumnLayoutModule,
        DynamicPageModule,
        ToolbarComponent,
        ToolbarItemDirective,
        NgStyle,
        CdkScrollable,
        ReactiveFormsModule,
        DatePickerComponent,
        SelectComponent,
        FdDatetimeModule,
        IconTabBarComponent,
        IconTabBarTabComponent
    ]
})
export class PlatformIconTabBarTextTypeExampleComponent {
    /**
     * property needed ONLY for the current documentation purposes
     * provides access to the HTML element with "overlay" reference
     */
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    /**
     * property set by the consuming application (name can vary????????)
     * sets the initial layout of the component to 'OneColumnStartFullScreen'
     * sets a new layout for the component
     */
    localLayout: FlexibleColumnLayout = 'OneColumnStartFullScreen';

    /**
     * property set by the consuming application
     * specifies if the control buttons for Enter/Exit Full Screen and Close
     * are visible in the middle sectioon
     */
    showMidColumnControls = this.localLayout.startsWith('Two') || this.localLayout.includes('FullScreen');

    /**
     * property set by the consuming application
     * checks if the component layout is in full screen
     */
    isFullScreen = this.localLayout.includes('FullScreen');

    /**
     * property needed ONLY for the current documentation purposes
     * specifies if the doc example is rendered in fullscreen or not
     */
    fullscreen = false;

    /**
     * Form group containing filter controls for the dynamic page
     * Contains period (date) and center (select) form controls
     */
    formFilters = new FormGroup({
        period: new FormControl(null),
        center: new FormControl('')
    });

    /**
     * Retrieves and logs the current filter values from the form
     * Used to demonstrate form submission in the dynamic page example
     */
    getData(): void {
        const filters = this.formFilters.value;
        console.log('Filters:', filters);
    }

    /**
     * function set by the consuming application
     * this function is reacting to events (button clicks) and
     * updates the local property which sets a new layout for the component.
     * Available values for the layouts include:
     * 'OneColumnStartFullScreen' | 'OneColumnMidFullScreen' | 'OneColumnEndFullScreen' |
     * 'TwoColumnsStartExpanded' | 'TwoColumnsMidExpanded' | 'TwoColumnsEndExpanded' |
     * 'ThreeColumnsMidExpanded' | 'ThreeColumnsEndExpanded' | 'ThreeColumnsStartMinimized' |
     * 'ThreeColumnsEndMinimized';
     */
    changeLayout(newValue: FlexibleColumnLayout): void {
        this.localLayout = newValue;
        this.showMidColumnControls = this.localLayout.startsWith('Two') || this.localLayout.includes('FullScreen');
        this.isFullScreen = this.localLayout.includes('FullScreen');
    }

    /**
     * function needed ONLY for the current documentation purposes
     * opens the example in full screen
     */
    enterFullscreenExample(): void {
        this.fullscreen = true;
        this.overlay.nativeElement.style.width = '100%';
    }

    /**
     * function needed ONLY for the current documentation purposes
     * exits the full screen mode of the example
     */
    exitFullscreenExample(event: Event): void {
        event.stopPropagation();
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
    }
}
