import { Component, ChangeDetectionStrategy, ElementRef, ViewChild, OnDestroy } from '@angular/core';

import { PlatformDynamicPagePageOverflowService } from './platform-dynamic-page-page-overflow.service';

@Component({
    selector: 'fdp-platform-dynamic-page-non-collapsible-example',
    templateUrl: './platform-dynamic-page-non-collapsible-example.component.html',
    styleUrls: ['./platform-dynamic-page-non-collapsible-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageNonCollapsibleExampleComponent implements OnDestroy {
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
