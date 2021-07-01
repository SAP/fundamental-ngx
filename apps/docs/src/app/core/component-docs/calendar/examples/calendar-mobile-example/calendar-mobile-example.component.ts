import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FdDate } from '@fundamental-ngx/core/datetime';
import { DialogService } from '@fundamental-ngx/core/dialog';

@Component({
    selector: 'fd-calendar-mobile-example',
    templateUrl: './calendar-mobile-example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CalendarMobileExampleComponent {
    datePicked: FdDate = FdDate.getNow();

    constructor(private _dialogService: DialogService) {}

    openLandScapeDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(dialog, {
            mobile: true,
            responsivePadding: true,
            verticalPadding: false,
            width: '640px',
            height: '400px'
        });
    }

    openPortraitDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(dialog, {
            mobile: true,
            responsivePadding: true,
            verticalPadding: false,
            width: '360px',
            height: '640px'
        });
    }

    dateChanged(date: FdDate): void {
        this.datePicked = date;
    }
}
