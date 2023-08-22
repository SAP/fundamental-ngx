import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';
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
import { TitleComponent } from '@fundamental-ngx/core/title';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-fixed-card-layout-mobile-examples',
    templateUrl: './fixed-card-layout-mobile-examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        ButtonModule,
        DialogModule,
        TitleComponent,
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
export class FixedCardLayoutMobileExampleComponent {
    constructor(private _dialogService: DialogService) {}

    openMobile(dialogTemplate): void {
        this._dialogService.open(dialogTemplate, {
            mobile: true,
            verticalPadding: true,
            responsivePadding: true
        });
    }
}
