import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-fixed-card-layout-mobile-examples',
    templateUrl: './fixed-card-layout-mobile-examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
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
