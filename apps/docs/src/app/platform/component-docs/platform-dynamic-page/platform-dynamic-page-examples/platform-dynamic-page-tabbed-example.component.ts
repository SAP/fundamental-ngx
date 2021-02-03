import { Component, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import {
    DynamicPageCollapseChangeEvent,
    DynamicPageComponent,
    DynamicPageTabChangeEvent
} from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-dynamic-page-tabbed-example',
    templateUrl: './platform-dynamic-page-tabbed-example.component.html',
    styleUrls: ['./platform-dynamic-page-tabbed-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageTabbedExampleComponent {
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    @ViewChild(DynamicPageComponent)
    dynamicPageComponent: DynamicPageComponent;

    fullscreen = false;

    pageTitle = 'Balenciaga Tripple S Trainers';

    onCollapseChange(event: DynamicPageCollapseChangeEvent): void {
        console.log('collapse changed');
    }

    openPage(): void {
        this.overlay.nativeElement.style.width = '100%';
        this.fullscreen = true;
        document.getElementById('page-content').style.overflowY = 'hidden'; // hide the underlying page scrollbars
    }
    closePage(event: Event): void {
        event.stopPropagation();
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
        document.getElementById('page-content').style.overflowY = 'auto';
    }

    onTabChanged(event: DynamicPageTabChangeEvent): void {
        console.log('tab changed to ' + event.payload.id);
    }

    switchTab(id: string): void {
        this.dynamicPageComponent.setSelectedTab(id);
    }
}
