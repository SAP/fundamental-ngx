import { Component } from '@angular/core';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';

import { FlexibleColumnLayout } from '@fundamental-ngx/core/flexible-column-layout';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { BarModule } from '@fundamental-ngx/core/bar';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { NgIf, NgFor } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-dynamic-page-column-layout-example',
    templateUrl: './dynamic-page-column-layout-example.component.html',
    styles: [
        `
            .overlay {
                height: 100%;
                width: 100%;
                position: fixed;
                z-index: 10;
                top: 0;
                left: 0;
                background-color: rgb(255, 255, 255);
                overflow-x: hidden;
            }
            .fd-dynamic-page-section-example {
                min-height: 20vh;
            }
        `
    ],
    standalone: true,
    imports: [
        ButtonModule,
        NgIf,
        FlexibleColumnLayoutModule,
        DynamicPageModule,
        BreadcrumbModule,
        LinkComponent,
        ContentDensityDirective,
        ToolbarComponent,
        ToolbarItemDirective,
        ToolbarSeparatorComponent,
        CdkScrollable,
        BarModule,
        TabsModule,
        NgFor
    ]
})
export class DynamicPageColumnLayoutExampleComponent {
    visible = false;

    pageTitle = 'Balenciaga Tripple S Trainers';

    /**
     * documentation related property
     * sets the initial layout of the component to 'OneColumnStartFullScreen'
     * sets a new layout for the component
     */
    localLayout: FlexibleColumnLayout = 'OneColumnStartFullScreen';

    separatorAriaLabel = 'separator';

    expandTitle = 'Expand';

    collapseTitle = 'Collapse';

    constructor(private _messageToastService: MessageToastService) {}

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

    onCollapseChange(): void {
        console.log('collapse changed');
    }

    openPage(): void {
        this.visible = true;
        this._openToast('Dynamic Page has been opened');
    }

    closePage(): void {
        this.visible = false;
    }

    handleAction(action: string): void {
        this.closePage();
        this._openToast(action);
    }

    private _openToast(content: string): void {
        this._messageToastService.open(content, { duration: 3000 });
    }
}
