import { PlatformLocation } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { DynamicPageCollapseChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-dynamic-page-header-facet-example',
    templateUrl: './platform-dynamic-page-header-facet-example.component.html',
    styleUrls: ['./platform-dynamic-page-header-facet-example.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformDynamicPageHeaderFacetExampleComponent {
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    visible = false;

    pageTitle = 'Balenciaga Tripple S Trainers';

    constructor(
      private platformLocation: PlatformLocation ) {
        // resets page overflow on pressing browser back button
        platformLocation.onPopState(() => document.getElementById('page-content').style.overflowY = 'auto');
      }

    onCollapseChange(event: DynamicPageCollapseChangeEvent): void {
        console.log('collapse changed');
    }

    resizeClicked(event: Event): void {
        event.stopPropagation();
    }

    openPage(): void {
      this.visible = true;
        // this.overlay.nativeElement.style.width = '100%';
        // document.getElementById('page-content').style.overflowY = 'hidden'; // hide the underlying page scrollbars
    }
    closePage(event: Event): void {
        event.stopPropagation();
        this.visible = false;
        // this.overlay.nativeElement.style.width = '0%';
        // document.getElementById('page-content').style.overflowY = 'auto';
    }
}
