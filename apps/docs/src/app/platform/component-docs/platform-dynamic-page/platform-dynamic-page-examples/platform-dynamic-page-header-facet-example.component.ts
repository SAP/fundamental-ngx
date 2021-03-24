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

    onCollapseChange(event: DynamicPageCollapseChangeEvent): void {
        console.log('collapse changed');
    }

    resizeClicked(event: Event): void {
        event.stopPropagation();
    }

    openPage(): void {
        this.visible = true;
    }
    
    closePage(event: Event): void {
        event.stopPropagation();
        this.visible = false;
    }
}
