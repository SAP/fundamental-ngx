import { CdkScrollable } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FocusableGridDirective } from '@fundamental-ngx/cdk/utils';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CardModule } from '@fundamental-ngx/core/card';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { DialogModule, DialogService } from '@fundamental-ngx/core/dialog';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { TableModule } from '@fundamental-ngx/core/table';
import { TitleComponent } from '@fundamental-ngx/core/title';

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
