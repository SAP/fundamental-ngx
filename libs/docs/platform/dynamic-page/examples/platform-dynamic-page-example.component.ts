import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { PlatformDynamicPagePageOverflowService } from './platform-dynamic-page-page-overflow.service';
import { BarModule } from '@fundamental-ngx/core/bar';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ToolbarSeparatorComponent } from '@fundamental-ngx/core/toolbar';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ToolbarItemDirective } from '@fundamental-ngx/core/toolbar';
import { ToolbarComponent } from '@fundamental-ngx/core/toolbar';
import { LinkComponent } from '@fundamental-ngx/core/link';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { PlatformDynamicPageModule } from '@fundamental-ngx/platform/dynamic-page';
import { NgIf } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdp-platform-dynamic-page-example',
    templateUrl: './platform-dynamic-page-example.component.html',
    styleUrls: ['./platform-dynamic-page-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ButtonModule,
        NgIf,
        PlatformDynamicPageModule,
        BreadcrumbModule,
        LinkComponent,
        ToolbarComponent,
        ToolbarItemDirective,
        ContentDensityDirective,
        ToolbarSeparatorComponent,
        IconModule,
        InlineHelpModule,
        BarModule
    ]
})
export class PlatformDynamicPageExampleComponent implements OnDestroy {
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    fullscreen = false;

    pageTitle = 'Balenciaga Tripple S Trainers';

    constructor(private _overflowHandlingService: PlatformDynamicPagePageOverflowService) {}

    onCollapseChange(): void {
        console.log('collapse changed');
    }

    resizeClicked(event: Event): void {
        event.stopPropagation();
    }

    openPage(): void {
        this.fullscreen = true;
        this.overlay.nativeElement.style.width = '100%';
        this._overflowHandlingService.isExampleOpened.next(true);
    }

    closePage(event: Event): void {
        event.stopPropagation();
        this.resetPageActions();
    }

    resetPageActions(): void {
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
        this._overflowHandlingService.isExampleOpened.next(false);
    }

    ngOnDestroy(): void {
        this.resetPageActions();
    }
}
