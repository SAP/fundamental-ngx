import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { TableModule } from '@fundamental-ngx/core/table';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ListModule } from '@fundamental-ngx/core/list';
import { CardModule } from '@fundamental-ngx/core/card';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormsModule } from '@angular/forms';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';

@Component({
    selector: 'fd-fixed-card-layout-custom-width-example',
    templateUrl: './fixed-card-layout-custom-width-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        SegmentedButtonModule,
        FormsModule,
        ButtonModule,
        CdkScrollable,
        ScrollbarDirective,
        FixedCardLayoutModule,
        CardModule,
        ListModule,
        ObjectStatusModule,
        FocusableGridDirective,
        TableModule,
        AvatarModule,
        ContentDensityDirective
    ]
})
export class FixedCardLayoutCustomWidthExampleComponent {
    cardMinimumWidth = 320;
}
