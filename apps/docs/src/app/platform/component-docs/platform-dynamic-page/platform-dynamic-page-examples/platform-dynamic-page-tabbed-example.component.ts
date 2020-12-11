import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { DynamicPageCollapseChangeEvent, DynamicPageTabChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-dynamic-page-tabbed-example',
    templateUrl: './platform-dynamic-page-tabbed-example.component.html',
    styleUrls: ['./platform-dynamic-page-tabbed-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageTabbedExampleComponent {
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    fullscreen = false;

    pageTitle = 'Balenciaga Tripple S Trainers';

    onCollapseChange(event: DynamicPageCollapseChangeEvent): void {
        console.log('collapse changed');
    }

    openPage(): void {
        this.overlay.nativeElement.style.width = '100%';
        this.fullscreen = true;
    }
    closePage(event: Event): void {
        event.stopPropagation();
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
    }

    onTabChanged(event: DynamicPageTabChangeEvent): void {
        console.log('tab changedd to ' + event.payload);
    }
}
