import { CdkScrollable } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { ColumnsWidthConfig, FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';

@Component({
    selector: 'fd-fixed-card-layout-custom-column-width-example',
    templateUrl: './fixed-card-layout-custom-column-width-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        ButtonComponent,
        CdkScrollable,
        ScrollbarDirective,
        FixedCardLayoutModule,
        CardModule,
        ListModule,
        ObjectStatusComponent
    ]
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
