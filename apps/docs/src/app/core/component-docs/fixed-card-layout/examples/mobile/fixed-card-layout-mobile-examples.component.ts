import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FixedCardLayoutComponent } from '@fundamental-ngx/core';

const portraitWidth = 375; // width in pixel for iPhone X
const landscapeWidth = 812;

@Component({
    selector: 'fd-fixed-card-layout-mobile-examples',
    templateUrl: './fixed-card-layout-mobile-examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedCardLayoutMobileExampleComponent {
    /** @hidden */
    @ViewChild(FixedCardLayoutComponent)
    layout: FixedCardLayoutComponent;

    mobileWidth: number = portraitWidth;
    mobileHeight: number = landscapeWidth;

    public changeOrientation(orientation: string): void {
        if (orientation === 'portrait') {
            this.mobileWidth = portraitWidth;
            this.mobileHeight = landscapeWidth;
        } else {
            this.mobileWidth = landscapeWidth;
            this.mobileHeight = portraitWidth;
        }
        this.layout.updateLayout();
    }
}
