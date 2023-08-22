import { Component } from '@angular/core';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';
import { BarModule } from '@fundamental-ngx/core/bar';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { NgIf, NgFor } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-dynamic-page-tabs-example',
    templateUrl: './dynamic-page-tabs-example.component.html',
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
        DynamicPageModule,
        BreadcrumbModule,
        LinkComponent,
        ToolbarComponent,
        ToolbarItemDirective,
        ContentDensityDirective,
        ToolbarSeparatorComponent,
        TabsModule,
        NgFor,
        CdkScrollable,
        BarModule
    ]
})
export class DynamicPageTabsExampleComponent {
    visible = false;

    stackedTabs = false;

    pageTitle = 'Balenciaga Tripple S Trainers';

    constructor(private _messageToastService: MessageToastService) {}

    onCollapseChange(): void {
        console.log('collapse changed');
    }

    openPage(stacked: boolean): void {
        this.stackedTabs = stacked;
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
