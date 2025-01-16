import { CdkScrollable } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CardModule } from '@fundamental-ngx/core/card';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { ListModule } from '@fundamental-ngx/core/list';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';

@Component({
    selector: 'fd-fixed-card-layout-max-columns-example',
    templateUrl: './fixed-card-layout-max-columns-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [CdkScrollable, ScrollbarDirective, FixedCardLayoutModule, CardModule, ListModule]
})
export class FixedCardLayoutMaxColumnsExampleComponent {}
