import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ColumnsWidthConfig } from '@fundamental-ngx/core/fixed-card-layout';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ListModule } from '@fundamental-ngx/core/list';
import { CardModule } from '@fundamental-ngx/core/card';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-fixed-card-layout-custom-column-width-example',
    templateUrl: './fixed-card-layout-custom-column-width-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        ButtonModule,
        CdkScrollable,
        ScrollbarDirective,
        FixedCardLayoutModule,
        CardModule,
        ListModule,
        ObjectStatusModule
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
