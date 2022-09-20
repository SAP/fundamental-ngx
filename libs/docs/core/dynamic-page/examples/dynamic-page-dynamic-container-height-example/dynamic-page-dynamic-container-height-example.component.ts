import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-dynamic-page-dynamic-container-height-example',
    templateUrl: './dynamic-page-dynamic-container-height-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../dynamic-page-example.component.scss']
})
export class DynamicPageDynamicContainerHeightExampleComponent {
    @ViewChild('overlay')
    overlay: ElementRef<HTMLElement>;

    fullscreen = false;
    spacingItems: string[] = [];

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

    addSpace(): void {
        if (this.spacingItems.length > 1) {
            return;
        }
        this.spacingItems.push(`Spacing item ${this.spacingItems.length + 1}`);
    }
}
