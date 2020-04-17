import { Component, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DialogService, FdDate } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-calendar-mobile-example',
    templateUrl: './calendar-mobile-example.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [`
        .fd-calendar--mobile-landscape .fd-calendar__navigation--main {
            padding-right: calc(640px - 320px)!important;
        }
    `]
})
export class CalendarMobileExampleComponent {

    datePicked: FdDate = FdDate.getToday();

    constructor(private _dialogService: DialogService) { }

    openLandScapeDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(
            dialog,
            { mobile: true, responsivePadding: true, verticalPadding: false, width: '640px', height: '400px' }
        );
    }

    openPortraitDialog(dialog: TemplateRef<any>): void {
        this._dialogService.open(
            dialog,
            { mobile: true, responsivePadding: true, verticalPadding: false, width: '360px', height: '640px' }
        );
    }

    dateChanged(date: FdDate): void {
        this.datePicked = date;
    }
}
