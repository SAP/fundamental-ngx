import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe } from '@angular/common';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';
import { ToolbarComponent, ToolbarItemDirective, ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';
import { FDP_ICON_TAB_BAR, IconTabBarItem, TabConfig } from '@fundamental-ngx/platform/icon-tab-bar';

@Component({
    selector: 'fd-dummy-stuff',
    imports: [AsyncPipe],
    template: `{{ (route.data | async)?.text }}`
})
export class DummyComponent {
    route = inject(ActivatedRoute);
}

@Component({
    selector: 'fd-dynamic-page-routing-example',
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
    imports: [
        ButtonComponent,
        DynamicPageModule,
        BreadcrumbModule,
        LinkComponent,
        ToolbarComponent,
        ToolbarItemDirective,
        ContentDensityDirective,
        ToolbarSeparatorComponent,
        FDP_ICON_TAB_BAR,
        CdkScrollable,
        BarModule,
        MessageToastModule,
        RouterLink,
        RouterOutlet,
        MessageStripModule
    ],
    templateUrl: './dynamic-page-routing-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageRoutingExampleComponent {
    visible = false;

    pageTitle = 'Balenciaga Tripple S Trainers';

    tabsConfig: TabConfig[] = [
        {
            label: 'Example 1',
            id: 'example1'
        },
        {
            label: 'Example 2',
            id: 'example2'
        },
        {
            label: 'Example 3',
            id: 'example3'
        }
    ];

    constructor(
        private _messageToastService: MessageToastService,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute
    ) {}

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

    navigate(item: IconTabBarItem): void {
        this._router.navigate([item.id!], { relativeTo: this._route });
    }

    private _openToast(content: string): void {
        this._messageToastService.open(content, { duration: 3000 });
    }
}
