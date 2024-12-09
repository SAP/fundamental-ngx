import { CdkScrollable } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { TableModule } from '@fundamental-ngx/core/table';

@Component({
    selector: 'fd-fixed-card-layout-custom-width-example',
    templateUrl: './fixed-card-layout-custom-width-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        SegmentedButtonModule,
        FormsModule,
        ButtonComponent,
        CdkScrollable,
        ScrollbarDirective,
        FixedCardLayoutModule,
        CardModule,
        ListModule,
        ObjectStatusComponent,
        FocusableGridDirective,
        TableModule,
        AvatarComponent,
        ContentDensityDirective
    ]
})
export class FixedCardLayoutCustomWidthExampleComponent {
    cardMinimumWidth = 320;
}
