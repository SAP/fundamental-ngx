import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-dynamic-page-facets-example',
    templateUrl: './dynamic-page-facets-example.component.html',
    styleUrls: ['../dynamic-page-example.component.scss']
})
export class DynamicPageFacetsExampleComponent {
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    fullscreen = false;

    onCollapseChange(): void {
        console.log('collapse changed');
    }

    openPage(): void {
        this.fullscreen = true;
        this.overlay.nativeElement.style.width = '100%';
    }

    closePage(): void {
        this.fullscreen = false;
        this.overlay.nativeElement.style.width = '0%';
    }
}
