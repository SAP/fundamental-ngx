import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { CdkScrollable } from '@angular/cdk/scrolling';

import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbComponent, BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FlexibleColumnLayout, FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';
import { DynamicPageComponent, PlatformDynamicPageModule } from '@fundamental-ngx/platform/dynamic-page';
import { PlatformDynamicPagePageOverflowService } from './platform-dynamic-page-page-overflow.service';

@Component({
    selector: 'fdp-platform-dynamic-page-flexible-column-example',
    templateUrl: './platform-dynamic-page-flexible-column-example.component.html',
    styleUrls: ['./platform-dynamic-page-flexible-column-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonComponent,
        FlexibleColumnLayoutModule,
        CdkScrollable,
        PlatformDynamicPageModule,
        BreadcrumbModule,
        LinkComponent,
        ToolbarComponent,
        ToolbarItemDirective,
        ContentDensityDirective,
        ToolbarSeparatorComponent,
        BarModule
    ]
})
export class PlatformDynamicPageFlexibleColumnExampleComponent implements OnDestroy {
    /**
     * documentation related property
     * provides access to the HTML element with "overlay" reference
     */
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    /**
     * access underlying dynamic page component
     */
    @ViewChild(DynamicPageComponent)
    dynamicPageComponent: DynamicPageComponent;

    /**
     * access to breadcrumb component
     */
    @ViewChild(BreadcrumbComponent)
    breadCrumbComponent: BreadcrumbComponent;

    /**
     * documentation related property
     * specifies if the doc example is rendered in fullscreen or not
     */
    fullscreen = false;

    pageTitle = 'Balenciaga Tripple S Trainers';

    /**
     * documentation related property
     * sets the initial layout of the component to 'OneColumnStartFullScreen'
     * sets a new layout for the component
     */
    localLayout: FlexibleColumnLayout = 'OneColumnStartFullScreen';

    constructor(private _overflowHandlingService: PlatformDynamicPagePageOverflowService) {}

    onCollapseChange(): void {
        console.log('collapse changed');
    }

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
        this.onViewportChanged();
    }

    /**
     * documentation related function
     * opens the example in full screen
     */
    openPage(): void {
        this.fullscreen = true;
        this.overlay.nativeElement.style.width = '100%';
        this._overflowHandlingService.isExampleOpened.next(true);
    }

    /**
     * documentation related function
     * exits the full screen mode of the example
     */
    closePage(event: Event): void {
        event.stopPropagation();
        this.resetPageActions();
    }

    resetPageActions(): void {
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
        this._overflowHandlingService.isExampleOpened.next(false);
    }

    onLayoutChanged(layout: FlexibleColumnLayout): void {
        console.log('layout is ' + layout);
        this.onViewportChanged();
    }

    private onViewportChanged(): void {
        // Wait until animation is done and trigger Breadcrumb resize
        setTimeout(() => {
            this.breadCrumbComponent.onResize();
        }, 800);
    }

    ngOnDestroy(): void {
        this.resetPageActions();
    }
}
