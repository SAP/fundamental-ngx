import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FixedCardLayoutComponent } from '@fundamental-ngx/core';

const portraitWidth = 385; // width in pixel for phone
const landscapeWidth = 667;

@Component({
    selector: 'fd-fixed-card-layout-mobile-examples',
    templateUrl: './fixed-card-layout-mobile-examples.component.html'
})
export class FixedCardLayoutMobileExampleComponent {
    /** @hidden */
    @ViewChild(FixedCardLayoutComponent)
    layout: FixedCardLayoutComponent;

    mobileWidth: number = portraitWidth;
    mobileHeight: number = landscapeWidth;

    constructor(private readonly _cd: ChangeDetectorRef) {}

    public changeOrientation(orientation: string): void {
        if (orientation === 'portrait') {
            this.mobileWidth = portraitWidth;
            this.mobileHeight = landscapeWidth;
        } else {
            this.mobileWidth = landscapeWidth;
            this.mobileHeight = portraitWidth;
        }
        this._cd.detectChanges();
        this.layout.onResize();
    }
}
