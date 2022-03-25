import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ColumnsWidthConfig } from '@fundamental-ngx/core/fixed-card-layout';

@Component({
    selector: 'fd-fixed-card-layout-custom-column-width-example',
    templateUrl: './fixed-card-layout-custom-column-width-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FixedCardLayoutCustomColumnWidthExampleComponent {
    config: ColumnsWidthConfig = {};

    setConfig(): void {
        this.config = { '1': 300 };
    }

    resetConfig(): void {
        this.config = {};
    }
}
