import { Component, ElementRef, input, ViewChild } from '@angular/core';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FlexibleColumnLayout, FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { LayoutGridColDirective, LayoutGridComponent, LayoutGridRowDirective } from '@fundamental-ngx/core/layout-grid';

@Component({
    selector: 'fd-docs-fcl-grid-block',
    template: `<div class="fd-docs-fcl-grid-block-content">
        {{ itemNumber() }}
    </div>`,
    styles: [
        `
            .fd-docs-fcl-grid-block-content {
                display: flex;
                font-size: 2rem;
                color: #0854a0;
                min-height: 10rem;
                font-weight: bold;
                text-align: center;
                align-items: center;
                background: #d4e8f0;
                border-radius: 0.5rem;
                justify-content: center;
                border: 0.125rem solid #0854a0;
            }
        `
    ]
})
export class FlexibleColumnLayoutGridBlockComponent {
    readonly itemNumber = input<number>(0);
}

@Component({
    selector: 'fd-flexible-column-layout-example',
    templateUrl: './flexible-column-layout-example.component.html',
    styleUrls: ['flexible-column-layout-example.component.scss'],
    imports: [
        ButtonComponent,
        FlexibleColumnLayoutModule,
        LayoutGridComponent,
        LayoutGridRowDirective,
        LayoutGridColDirective,
        FlexibleColumnLayoutGridBlockComponent
    ]
})
export class FlexibleColumnLayoutExampleComponent {
    /**
     * documentation related property
     * provides access to the HTML element with "overlay" reference
     */
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    /**
     * documentation related property
     * specifies if the doc example is rendered in fullscreen or not
     */
    fullscreen = false;

    /**
     * documentation related property
     * sets the initial layout of the component to 'OneColumnStartFullScreen'
     * sets a new layout for the component
     */
    localLayout: FlexibleColumnLayout = 'OneColumnStartFullScreen';

    /**
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
    }

    /**
     * documentation related function
     * opens the example in full screen
     */
    enterFullscreenExample(): void {
        this.fullscreen = true;
        this.overlay.nativeElement.style.width = '100%';
    }

    /**
     * documentation related function
     * exits the full screen mode of the example
     */
    exitFullscreenExample(event: Event): void {
        event.stopPropagation();
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
    }
}
